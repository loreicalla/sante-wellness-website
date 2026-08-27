/* Lightweight, rotating discovery prompt. It does not claim real-time purchases or registrations. */
(function(){
  function mount(){
    if(document.getElementById('sante-discovery-proof')) return;
    var messages=[
      ['🌿','Explore SANTÉ Barley products','Discover wellness options at your own pace.'],
      ['🛍️','Popular path: Shop Wellness','Find products that fit your everyday routine.'],
      ['💼','Popular path: Preferred Member','Explore membership and package options.'],
      ['🚀','Popular path: Business Owner','Learn about the available business packages.'],
      ['👩‍💼','Need guidance? Lore can help','Get support as you explore your options.']
    ];
    var box=document.createElement('aside');
    box.id='sante-discovery-proof';
    box.setAttribute('aria-live','polite');
    box.innerHTML='<div class="sdp-icon" aria-hidden="true"></div><div class="sdp-copy"><strong></strong><span></span></div><button type="button" aria-label="Dismiss this message">×</button>';
    document.body.appendChild(box);
    var icon=box.querySelector('.sdp-icon'),title=box.querySelector('strong'),text=box.querySelector('span'),i=0,timer;
    function show(n){var m=messages[n];box.classList.remove('is-visible');setTimeout(function(){icon.textContent=m[0];title.textContent=m[1];text.textContent=m[2];box.classList.add('is-visible')},180)}
    function start(){timer=setInterval(function(){i=(i+1)%messages.length;show(i)},6500)}
    box.querySelector('button').onclick=function(){clearInterval(timer);box.classList.remove('is-visible');setTimeout(function(){box.remove()},250)};
    var style=document.createElement('style');
    style.textContent='#sante-discovery-proof{position:fixed;left:20px;bottom:22px;z-index:9990;width:min(330px,calc(100vw - 40px));display:grid;grid-template-columns:42px 1fr 24px;gap:11px;align-items:center;padding:13px 13px 13px 12px;border:1px solid rgba(30,92,60,.14);border-radius:18px;background:rgba(255,255,255,.94);box-shadow:0 18px 45px rgba(20,61,42,.16);backdrop-filter:blur(12px);opacity:0;transform:translateY(18px);transition:opacity .28s ease,transform .28s ease}.sdp-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:14px;background:#edf6ef;font-size:1.18rem}.sdp-copy strong{display:block;color:#203c2f;font-size:.88rem;line-height:1.25}.sdp-copy span{display:block;margin-top:4px;color:#6b786f;font-size:.76rem;line-height:1.38}.sdp-copy{min-width:0}#sante-discovery-proof button{border:0;background:transparent;color:#7c8982;font-size:1.25rem;cursor:pointer;padding:3px;line-height:1;align-self:start}#sante-discovery-proof.is-visible{opacity:1;transform:translateY(0)}@media(max-width:600px){#sante-discovery-proof{left:12px;bottom:82px;width:min(320px,calc(100vw - 24px))}}';
    document.head.appendChild(style);show(0);setTimeout(start,6800);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();