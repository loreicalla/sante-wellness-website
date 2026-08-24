(function(){
  const form=document.getElementById('leadForm');
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const text=[
      'Hi Lore! 👋 I submitted the form on your SANTÉ website.',
      '',
      'Name: '+[data.get('firstName'),data.get('lastName')].filter(Boolean).join(' '),
      'Email: '+data.get('email'),
      'Mobile / WhatsApp: '+data.get('phone'),
      'Country: '+data.get('country'),
      'Interested in: '+data.get('interest'),
      data.get('message') ? 'Message: '+data.get('message') : ''
    ].filter(Boolean).join('\n');
    const button=form.querySelector('.lead-submit');
    const original=button.textContent;
    button.textContent='Opening WhatsApp...';
    button.disabled=true;
    window.open('https://api.whatsapp.com/send?phone=639613552176&text='+encodeURIComponent(text),'_blank','noopener');
    setTimeout(()=>{button.textContent=original;button.disabled=false},1200);
  });
})();