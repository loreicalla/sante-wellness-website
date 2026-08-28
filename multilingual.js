/* Emergency recovery shim: translation is temporarily disabled while preserving the existing website. */
(function(){
  'use strict';
  function clearCookie(){
    var names=['googtrans'];
    var host=location.hostname;
    names.forEach(function(name){
      document.cookie=name+'=;path=/;max-age=0';
      document.cookie=name+'=;path=/;domain='+host+';max-age=0';
      if(host.indexOf('.')>-1){
        document.cookie=name+'=;path=/;domain=.'+host.replace(/^www\./,'')+';max-age=0';
      }
    });
  }
  function recover(){
    clearCookie();
    try{localStorage.removeItem('santewithlore-language')}catch(e){}
    document.documentElement.style.removeProperty('top');
    document.documentElement.style.removeProperty('margin-top');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('margin-top');
    document.body.style.removeProperty('position');
    document.querySelectorAll('.reveal').forEach(function(el){
      el.classList.add('visible');
      el.style.opacity='1';
      el.style.transform='none';
      el.style.visibility='visible';
    });
    document.querySelectorAll('.ml-switcher,.ml-loading,#google_translate_element,.goog-te-banner-frame,iframe.goog-te-banner-frame').forEach(function(el){
      if(el && el.parentNode) el.parentNode.removeChild(el);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',recover);
  else recover();
})();
