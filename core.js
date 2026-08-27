(function () {
  'use strict';
  var productLinks = {
    'SANTÉ Barley Canister': { philippines: 'https://partner.mysante.com/p/storefront-sphn01005?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sgln01005?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'SANTÉ Barley Powder': { philippines: 'https://partner.mysante.com/shop/premium/product/storefront-sphn01003?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium&product=storefront-sphn01003', global: 'https://partner.mysante.com/p/storefront-sgln01003?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'SANTÉ Barley Fusion': { philippines: 'https://partner.mysante.com/p/storefront-sphb01001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sglb01001?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'SANTÉ Barliccino': { philippines: 'https://partner.mysante.com/p/storefront-spho02001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: null },
    'SANTÉ Boost': { philippines: 'https://partner.mysante.com/p/storefront-sphb01002?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sglb01002?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    "Fit N' Trim": { philippines: 'https://partner.mysante.com/p/storefront-sphb03001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: null },
    'Beauty Collagen + Barley': { philippines: 'https://partner.mysante.com/p/storefront-sphk06001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sglk06001?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'Barley Trial Pack': { philippines: 'https://partner.mysante.com/p/storefront-sphn01001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sgln01001?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'SANTÉ FibrEnergy': { philippines: 'https://partner.mysante.com/p/storefront-spho01001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: null },
    'SANTÉ Fibrenergy': { philippines: 'https://partner.mysante.com/p/storefront-spho01001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: null },
    'Moments Day Pads': { philippines: 'https://partner.mysante.com/p/storefront-sphp01001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sglp01001?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'Moments Night Pads': { philippines: 'https://partner.mysante.com/p/storefront-sphp01002?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sglp01002?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'Moments Pantyliner': { philippines: 'https://partner.mysante.com/p/storefront-sphp02001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sglp02001?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'SANTÉ Natural Toothpaste': { philippines: 'https://partner.mysante.com/p/storefront-sphp03001?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium', global: 'https://partner.mysante.com/p/storefront-sglp03001?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium' },
    'Preferred Pack': { philippines: 'https://partner.mysante.com/epackage?ref=WEALTHYLORE&country=PH&package=preferred', global: 'https://partner.mysante.com/epackage?ref=WEALTHYLORE&country=GLOBAL&package=preferred' },
    'Intro Pack': { philippines: 'https://partner.mysante.com/epackage?ref=WEALTHYLORE&country=PH&package=intro', global: 'https://partner.mysante.com/epackage?ref=WEALTHYLORE&country=GLOBAL&package=intro' }
  };
  function getDestination(target) { var card=target.closest('.product-card, .package-card'); var title=card&&card.querySelector('h3')?card.querySelector('h3').textContent.trim():''; return productLinks[title]||null; }
  function ensureModalStyles(){if(document.getElementById('location-popup-styles'))return;var style=document.createElement('style');style.id='location-popup-styles';style.textContent=['.location-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(20,32,28,.52);backdrop-filter:blur(4px)}','.location-box{position:relative;width:min(540px,100%);padding:38px 36px 30px;border-radius:24px;background:#fff;color:#20362d;box-shadow:0 24px 80px rgba(0,0,0,.28)}','.location-close{position:absolute;top:14px;right:18px;border:0;background:transparent;color:#20362d;font-size:32px;line-height:1;cursor:pointer}','.location-eyebrow{margin-bottom:12px;font-size:11px;font-weight:800;letter-spacing:4px;color:#247247}','.location-box h2{margin:0 0 12px;font-size:42px;line-height:1.12;color:#20362d}','.location-box p{margin:0 0 24px;color:#52645d;font-size:16px}','.location-options{display:grid;grid-template-columns:1fr 1fr;gap:14px}','.location-choice{display:flex;min-height:108px;flex-direction:column;align-items:flex-start;justify-content:center;gap:8px;padding:20px;border:1px solid #d9dfdc;border-radius:16px;background:#f8faf9;color:#20362d;font-size:16px;font-weight:800;text-align:left;cursor:pointer}','.location-choice:hover{border-color:#21834e;background:#f0f8f3;transform:translateY(-1px)}','.location-choice small{font-size:13px;font-weight:500;line-height:1.5;color:#61716a}','.location-choice:disabled{opacity:.55;cursor:not-allowed;transform:none}','@media(max-width:600px){.location-box{padding:32px 22px 22px}.location-box h2{font-size:32px}.location-options{grid-template-columns:1fr}}'].join('');document.head.appendChild(style)}
  function showLocationPopup(destinations){var existing=document.querySelector('.location-modal');if(existing)existing.remove();ensureModalStyles();var modal=document.createElement('div');modal.className='location-modal';var globalUnavailable=!destinations.global;modal.innerHTML=['<div class="location-box" role="dialog" aria-modal="true" aria-label="Choose your shopping location">','<button type="button" class="location-close" aria-label="Close">&times;</button>','<div class="location-eyebrow">CHOOSE YOUR LOCATION</div>','<h2>Where are you shopping from?</h2>','<p>Select your location to continue with SANTÉ.</p>','<div class="location-options">','<button type="button" class="location-choice philippines">🇵🇭 Philippines<small>Continue to the Philippine SANTÉ page.</small></button>','<button type="button" class="location-choice global"'+(globalUnavailable?' disabled':'')+'>🌎 Outside the Philippines<small>'+(globalUnavailable?'Currently available in the Philippines only.':'Continue to the Global SANTÉ page.')+'</small></button>','</div></div>'].join('');document.body.appendChild(modal);modal.querySelector('.philippines').addEventListener('click',function(){window.location.assign(destinations.philippines)});if(destinations.global)modal.querySelector('.global').addEventListener('click',function(){window.location.assign(destinations.global)});modal.querySelector('.location-close').addEventListener('click',function(){modal.remove()});modal.addEventListener('click',function(event){if(event.target===modal)modal.remove()})}
  document.addEventListener('click',function(event){var trigger=event.target.closest('.product-card a,.product-card button,.package-card a,.package-card button,.explore-btn');if(!trigger)return;var destinations=getDestination(trigger);if(!destinations)return;event.preventDefault();event.stopPropagation();showLocationPopup(destinations)},true);
})();

/* Safely restore the package section without changing existing page markup or design. */
(function(){
  function restorePackages(){
    if(document.getElementById('business-packages')) return;
    var business=document.querySelector('.business-section');
    if(!business) return;
    var anchor=document.querySelector('.package-restore');
    if(!anchor){
      anchor=document.createElement('div');
      anchor.className='package-restore';
      business.insertAdjacentElement('afterend',anchor);
    }
    if(document.querySelector('script[data-package-fix]')) return;
    var script=document.createElement('script');
    script.src='package-fix.js';
    script.defer=true;
    script.setAttribute('data-package-fix','true');
    document.body.appendChild(script);
  }
  function loadWellnessLightbox(){
    if(document.querySelector('script[data-wellness-lightbox]')) return;
    var script=document.createElement('script');
    script.src='wellness-lightbox.js';
    script.defer=true;
    script.setAttribute('data-wellness-lightbox','true');
    document.body.appendChild(script);
  }
  function loadEnhancements(){
    if(!document.querySelector('script[data-site-seo]')){
      var seo=document.createElement('script');seo.src='seo.js';seo.defer=true;seo.setAttribute('data-site-seo','true');document.body.appendChild(seo);
    }
    if(!document.querySelector('script[data-lore-chatbot]')){
      var chatbot=document.createElement('script');chatbot.src='chatbot.js';chatbot.defer=true;chatbot.setAttribute('data-lore-chatbot','true');document.body.appendChild(chatbot);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){restorePackages();loadWellnessLightbox();loadEnhancements();});
  else { restorePackages(); loadWellnessLightbox(); loadEnhancements(); }
})();
