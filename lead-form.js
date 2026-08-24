(function(){
  const form=document.getElementById('leadForm');
  if(!form)return;

  // After deploying Google Apps Script, add its /exec URL here.
  // Leave blank until setup is complete; WhatsApp fallback remains active.
  const GOOGLE_SHEETS_ENDPOINT='https://script.google.com/macros/s/AKfycbzeVxun_5lfufcrPq3YVB_KiHapFIOZ3d94sXUK3d1ofoKiGZOYW-tsHfqoHJC27Y61/exec';

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

  async function saveLead(data){
    if(!GOOGLE_SHEETS_ENDPOINT) return false;
    try{
      const response=await fetch(GOOGLE_SHEETS_ENDPOINT,{
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body:JSON.stringify(data)
      });
      return true;
    }catch(error){
      console.error('Lead capture failed',error);
      return false;
    }
  }

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    if(!form.reportValidity())return;

    const fd=new FormData(form);
    const data={
      submittedAt:new Date().toISOString(),
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
    button.textContent=GOOGLE_SHEETS_ENDPOINT?'Saving your information...':'Opening WhatsApp...';
    button.disabled=true;

    await saveLead(data);

    window.open(whatsappUrl(data),'_blank','noopener');
    button.textContent='Thank you! Your information is ready for follow-up ✓';

    setTimeout(()=>{
      button.textContent=original;
      button.disabled=false;
      form.reset();
    },3000);
  });
})();