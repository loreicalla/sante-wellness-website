(function(){
const products={"SANTÉ Barley Powder":{"d":"3g x 30 sachets per box • Certified organic young barley grass from New Zealand.","b":["Daily nutritional support with naturally occurring plant nutrients","Immune & antioxidant support","Dietary fiber for digestive support","Convenient pre-measured sachets for on-the-go use"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ Barley Canister":{"d":"200g with Stevia • Certified organic barley grass powder in a convenient canister.","b":["Supports immunity and overall wellness","Supports digestion and gut health","Provides antioxidant support","Dietary fiber supports fullness and weight-management goals"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"Barley Trial Pack":{"d":"3g x 10 sachets • A convenient trial-sized pack of organic young barley grass.","b":["Perfect size for trying the product","Budget-friendly introduction to a daily greens routine","Ultra-portable single-serve sachets","Supports daily nutrition and digestive wellness"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ Barley Fusion":{"d":"15g x 10 sachets • Robusta coffee blended with the nourishing benefits of barley.","b":["Sustained energy and mental alertness","Gentle daily coffee option","Antioxidant and digestive support","Supports metabolism and an active lifestyle"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ Barliccino":{"d":"15g x 10 sachets • Creamy cappuccino-style coffee blend with organic barley grass and stevia.","b":["Supports energy and focus","Naturally sweetened with stevia","Nutritional and antioxidant support from barley","Creamy and convenient anytime coffee"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ Boost":{"d":"15g x 10 sachets • Robusta coffee with Tongkat Ali and organic barley grass.","b":["Caffeine supports mental alertness","Tongkat Ali supports stamina and vitality","Organic barley grass supports general wellness","Convenient energizing coffee blend"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ FibrEnergy":{"d":"21g x 10 sachets • High-fiber cereal drink with organic barley grass, chia seeds, and oats.","b":["Sustained energy and focus","High fiber supports digestion and fullness","Supports heart and metabolic wellness","Nutrient-dense blend for daily vitality"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ Fit N' Trim":{"d":"7g x 10 sachets • Refreshing Green Tea Lemon drink for an active lifestyle.","b":["L-Carnitine supports fat metabolism and energy production","Green tea supports an active metabolism","Organic barley grass provides plant-based nutrients","Vitamin C and Zinc provide immune support"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ Beauty Collagen + Barley":{"d":"10g x 7 sachets • Calamansi-flavored collagen drink with no added table sugar.","b":["Supports skin elasticity and firmness","Antioxidant support from organic barley grass","Supports hydrated and radiant-looking skin","Supports hair and nail vitality"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"Moments Day Pads":{"d":"SANTÉ Moments Anion Sanitary Napkins – Day Pad 10's.","b":["Anion and Silver Ion technology for freshness support","8-layer absorbent protection","Wider wings for added confidence","Soft and breathable design for daytime comfort"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"Moments Night Pads":{"d":"SANTÉ Moments Anion Sanitary Napkins – Night Pad 5's • 320mm overnight coverage.","b":["Extended coverage for heavier-flow nights","Absorbent leak-lock core with secure wings","Anion technology for freshness support","Soft and breathable overnight comfort"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"Moments Pantyliner":{"d":"SANTÉ Moments Anion Pantyliners – 30's • Ultra-thin daily liners.","b":["Designed for daily freshness and comfort","Soft, breathable, and ultra-thin","Flexible fit for active movement","Convenient pack of 30 daily pantyliners"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"},"SANTÉ Natural Toothpaste":{"d":"SANTÉ Naturéal Toothpaste 100mL • Herbal oral care with barley and botanical ingredients.","b":["Aloe Vera and Chamomile support gentle gum care","Tea Tree Oil supports a clean oral environment","Fresh Mint supports long-lasting freshness","Free from SLS and Parabens • Fluoride-free"],"ph":"https://partner.mysante.com/wealthylore","gl":"https://partner.mysante.com/wealthylore"}};
function init(card){
 if(card.dataset.flipReady)return;
 const info=card.querySelector('.product-info'),name=info&&info.querySelector('h3');
 if(!name||!products[name.textContent.trim()])return;
 const p=products[name.textContent.trim()]; const original=card.cloneNode(true); const oldLink=original.querySelector('a'); if(oldLink){oldLink.removeAttribute('href');oldLink.removeAttribute('target');oldLink.removeAttribute('rel');oldLink.classList.add('flip-hint');oldLink.textContent='Tap product for details →';} const front=original.innerHTML;
 card.dataset.flipReady='1'; card.classList.add('flip-product-card');
 card.innerHTML='<div class="product-flip-inner"><div class="product-face product-front">'+front+'</div><div class="product-face product-back"><div class="product-back-content"><span class="product-back-label">PRODUCT DETAILS</span><h3>'+name.textContent.trim()+'</h3><p>'+p.d+'</p><ul>'+p.b.map(x=>'<li>✓ '+x+'</li>').join('')+'</ul><button type="button" class="product-explore">Ready to order? <span>→ BUY NOW</span></button><button type="button" class="product-close">← Back to Product Image</button></div></div></div>';
 card.querySelector('.product-front').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();card.classList.add('is-flipped')});
 card.querySelector('.product-explore').addEventListener('click',e=>{e.stopPropagation();openLocationModal(p)});
 card.querySelector('.product-close').addEventListener('click',e=>{
  e.preventDefault();
  e.stopImmediatePropagation();
  // Only return this card to its original front face/product image.
  card.classList.remove('is-flipped');
});
}
function openLocationModal(p){
 const previous=document.activeElement;
 const modal=document.createElement('div');
 modal.className='product-location-modal';
 modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); modal.setAttribute('aria-labelledby','location-modal-title');
 modal.innerHTML='<div class="product-location-overlay"></div><div class="product-location-dialog"><button class="location-modal-close" type="button" aria-label="Close">×</button><span class="location-modal-eyebrow">READY TO ORDER?</span><h3 id="location-modal-title">Choose your location</h3><p>Select where you would like to continue shopping.</p><div class="location-choice-buttons"><button type="button" data-url="'+p.ph+'">🇵🇭 <strong>Philippines</strong><small>Continue to SANTÉ Partner Site</small></button><button type="button" data-url="'+p.gl+'">🌎 <strong>Global</strong><small>Continue to SANTÉ Partner Site</small></button></div></div>';
 const scrollY=window.scrollY;
 document.body.appendChild(modal);
 document.documentElement.classList.add('location-modal-open');
 document.body.classList.add('location-modal-open');
 document.body.style.position='fixed';
 document.body.style.top='-'+scrollY+'px';
 document.body.style.left='0';
 document.body.style.right='0';
 document.body.style.width='100%';
 const close=()=>{
  document.documentElement.classList.remove('location-modal-open');
  document.body.classList.remove('location-modal-open');
  document.body.style.position='';document.body.style.top='';document.body.style.left='';document.body.style.right='';document.body.style.width='';
  modal.remove();window.scrollTo(0,scrollY);if(previous&&previous.focus)previous.focus()
 };
 modal.querySelector('.location-modal-close').addEventListener('click',close); modal.querySelector('.product-location-overlay').addEventListener('click',close);
 modal.querySelectorAll('[data-url]').forEach(b=>b.addEventListener('click',()=>window.open(b.dataset.url,'_blank','noopener')));
 modal.addEventListener('keydown',e=>{if(e.key==='Escape')close(); if(e.key==='Tab'){const focusable=[...modal.querySelectorAll('button')];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 modal.querySelector('.location-choice-buttons button').focus();
}
function run(){document.querySelectorAll('.product-card').forEach(init)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();