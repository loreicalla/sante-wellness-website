/* Load Meta Pixel once while preserving the existing website form and integrations. */
(function(){
  if(window.__santeMetaPixelLoaded || window.fbq) return;
  window.__santeMetaPixelLoaded=true;
  var script=document.createElement('script');
  script.src='meta-pixel.js?v=20260903';
  script.async=true;
  document.head.appendChild(script);
})();

(function(){
  const form=document.getElementById('leadForm');
  if(!form)return;

  // Live Google Apps Script Web App endpoint.
  const GOOGLE_SHEETS_ENDPOINT='https://script.google.com/macros/s/AKfycbyAH0bwPH0cH4dUFFrO45vjc697oO8I9WhIuzaxi1jCemF-dsgSpicUfnGdnoJOUBJO/exec';

  // Official Zoho CRM Webform endpoint and required hidden values from
  // the active "SANTÉ Website Lead Form" Webform.
  const ZOHO_CRM_ENDPOINT='https://crm.zoho.com/crm/WebToLeadForm';
  const ZOHO_FORM_FIELDS={
    xnQsjsdp:'e82c32280fc75bb27e68a381e68b0c3b4761dddc2b47697946120ed5492fff2d',
    xmIwtLD:'4ee167c43f937d483c432f649775263afc0197c44fd6134d2ff622c81b0ed07ee07b38818e5c83d356d1e35e2a459196',
    actionType:'TGVhZHM=',
    returnURL:'null'
  };

  function getPackage(interest){
    if(/Affiliate|Preferred/i.test(interest)) return 'Preferred / Affiliate Pack';
    if(/Business|Intro/i.test(interest)) return 'Intro / Business Pack';
    return '';
  }

  function whatsappUrl(data){
    const text=[
      'Hi Lore! 👋 I submitted the form on your SANTÉ website.',
      '',
      'Name: '+data.fullName,
      'Email: '+data.email,
      'Mobile / WhatsApp: '+data.phone,
      'Country: '+data.country,
      'Interested in: '+data.interest,
      data.message ? 'Message: '+data.message : ''
    ].filter(Boolean).join('\n');
    return 'https://api.whatsapp.com/send?phone=639613552176&text='+encodeURIComponent(text);
  }

  async function saveToGoogleSheets(data){
    if(!GOOGLE_SHEETS_ENDPOINT) return false;
    try{
      await fetch(GOOGLE_SHEETS_ENDPOINT,{
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body:JSON.stringify(data)
      });
      return true;
    }catch(error){
      console.error('Google Sheets lead capture failed',error);
      return false;
    }
  }

  async function saveToZoho(data){
    try{
      const zohoFormData=new FormData();

      Object.keys(ZOHO_FORM_FIELDS).forEach(function(key){
        zohoFormData.append(key,ZOHO_FORM_FIELDS[key]);
      });

      // Zoho's active Webform requires Last Name. Keep the existing website
      // form unchanged; when a visitor leaves Last Name blank, use the first
      // name as the required Zoho Last Name value rather than blocking the form.
      zohoFormData.append('First Name',data.firstName);
      zohoFormData.append('Last Name',data.lastName || data.firstName || 'Website Lead');
      zohoFormData.append('Email',data.email);
      zohoFormData.append('Mobile',data.phone);
      zohoFormData.append('Lead Source','Online Store');
      zohoFormData.append('zc_gad','');
      zohoFormData.append('aG9uZXlwb3Q','');

      const response=await fetch(ZOHO_CRM_ENDPOINT,{
        method:'POST',
        body:zohoFormData,
        cache:'no-cache'
      });

      if(!response.ok) throw new Error('Zoho CRM returned HTTP '+response.status);

      await response.text();
      return true;
    }catch(error){
      console.error('Zoho CRM lead capture failed',error);
      return false;
    }
  }

  function trackLead(data){
    var params={
      currency:'PHP',
      method:'website_lead_form',
      lead_type:data.interest || 'general_information'
    };

    // Fire after the form has completed its lead-capture work. This avoids
    // losing the conversion event while the browser is waiting on Sheets/Zoho.
    if(typeof window.gtag==='function'){
      window.gtag('event','generate_lead',params);
      return;
    }

    // If the Google tag is still loading, retry briefly rather than dropping
    // the lead event.
    var attempts=0;
    var retry=setInterval(function(){
      attempts++;
      if(typeof window.gtag==='function'){
        clearInterval(retry);
        window.gtag('event','generate_lead',params);
      }else if(attempts>=10){
        clearInterval(retry);
        console.warn('GA4 lead event could not be sent because gtag was unavailable.');
      }
    },250);
  }

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    if(!form.reportValidity())return;

    const fd=new FormData(form);
    const data={
      submittedAt:new Date().toISOString(),
      firstName:fd.get('firstName')||'',
      lastName:fd.get('lastName')||'',
      fullName:[fd.get('firstName'),fd.get('lastName')].filter(Boolean).join(' '),
      email:fd.get('email')||'',
      phone:fd.get('phone')||'',
      country:fd.get('country')||'',
      interest:fd.get('interest')||'',
      package:getPackage(fd.get('interest')||''),
      message:fd.get('message')||'',
      sourcePage:window.location.href
    };

    const button=form.querySelector('.lead-submit');
    const original=button.textContent;
    button.textContent='Saving your information...';
    button.disabled=true;

    // Preserve the existing Google Sheets capture while also sending the lead
    // to the active Zoho CRM Webform.
    await Promise.allSettled([
      saveToGoogleSheets(data),
      saveToZoho(data)
    ]);

    // Record the GA4 conversion after the lead-capture requests finish.
    trackLead(data);

    window.open(whatsappUrl(data),'_blank','noopener');
    button.textContent='Thank you! Your information is ready for follow-up ✓';

    setTimeout(()=>{
      button.textContent=original;
      button.disabled=false;
      form.reset();
    },3000);
  });
})();