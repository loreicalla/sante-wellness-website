(function(){
const products={
"SANTÉ Barley Powder":{d:"Certified organic barley grass powder from New Zealand.",b:["Plant-based daily wellness support","Easy to add to your everyday routine","Available in convenient sachets"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ Barley Canister":{d:"A convenient canister format for enjoying organic barley grass powder at home.",b:["Certified organic barley grass","Convenient canister format","Designed for everyday routines"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"Barley Trial Pack":{d:"A smaller, convenient pack for those who want to explore SANTÉ Barley.",b:["Easy way to try the product","Convenient smaller pack","Simple addition to your routine"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ Barley Fusion":{d:"A coffee mix that combines coffee with barley grass for an enjoyable daily coffee routine.",b:["Coffee and barley in one blend","Convenient instant mix","Made for coffee lovers"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ Barliccino":{d:"A cappuccino-style coffee mix with SANTÉ barley and stevia.",b:["Creamy cappuccino-style taste","With SANTÉ barley","Convenient coffee mix"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ Boost":{d:"An instant coffee mix featuring Tongkat Ali extract and organic barley grass.",b:["Instant coffee convenience","With Tongkat Ali extract","Includes organic barley grass"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ FibrEnergy":{d:"A cereal mix featuring SANTÉ Barley, chia and oats.",b:["Made with barley, chia and oats","Easy-to-prepare cereal mix","A convenient lifestyle option"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ Fit N' Trim":{d:"A green tea lemon instant powdered drink mix designed for an active lifestyle.",b:["Refreshing green tea lemon flavor","Convenient powdered drink mix","Designed for lifestyle routines"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ Beauty Collagen + Barley":{d:"A powder mix featuring collagen and barley for your beauty and wellness routine.",b:["Combines collagen and barley","Convenient powder format","Designed for daily routines"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"Moments Day Pads":{d:"Anion sanitary day pads with wings for everyday comfort.",b:["Daytime personal care","With wings for added security","Designed for everyday comfort"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"Moments Night Pads":{d:"Anion night pads with wings designed for overnight personal care.",b:["Designed for nighttime use","With wings","Personal care essential"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"Moments Pantyliner":{d:"Soft and smooth everyday pantyliners for daily freshness.",b:["Soft everyday comfort","Convenient personal care","Designed for daily freshness"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"},
"SANTÉ Natural Toothpaste":{d:"Fresh mint toothpaste with barley and botanical ingredients.",b:["Fresh mint flavor","With barley and botanicals","Everyday oral care"],ph:"https://partner.mysante.com/wealthylore",gl:"https://partner.mysante.com/wealthylore"}
};
function init(card){
 if(card.dataset.flipReady)return;
 const info=card.querySelector('.product-info'),name=info&&info.querySelector('h3');
 if(!name||!products[name.textContent.trim()])return;
 const p=products[name.textContent.trim()],front=card.innerHTML;
 card.dataset.flipReady='1';
 card.classList.add('flip-product-card');
 card.innerHTML='<div class="product-flip-inner"><div class="product-face product-front">'+front+'</div><div class="product-face product-back"><div class="product-back-content"><span class="product-back-label">PRODUCT DETAILS</span><h3>'+name.textContent.trim()+'</h3><p>'+p.d+'</p><ul>'+p.b.map(x=>'<li>✓ '+x+'</li>').join('')+'</ul><button type="button" class="product-explore">Explore Product →</button><div class="product-location"><span>CHOOSE YOUR LOCATION</span><div><button type="button" data-url="'+p.ph+'">🇵🇭 Philippines</button><button type="button" data-url="'+p.gl+'">🌎 Global</button></div></div><button type="button" class="product-close">← Back to product</button></div></div></div>';
 card.addEventListener('click',e=>{if(e.target.closest('a,button'))return;card.classList.toggle('is-flipped')});
 card.querySelector('.product-front').addEventListener('click',e=>{if(!e.target.closest('a'))card.classList.add('is-flipped')});
 card.querySelector('.product-explore').addEventListener('click',()=>card.classList.add('show-location'));
 card.querySelector('.product-close').addEventListener('click',()=>{card.classList.remove('show-location');card.classList.remove('is-flipped')});
 card.querySelectorAll('[data-url]').forEach(b=>b.addEventListener('click',()=>window.open(b.dataset.url,'_blank','noopener')));
}
function run(){document.querySelectorAll('.product-card').forEach(init)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();