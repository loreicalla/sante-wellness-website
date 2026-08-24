/* Guided chatbot + package restoration. Loaded after the existing website script. */
(function(){
  const start=()=>{
    const body=document.querySelector('.sante-chat-body'),panel=document.querySelector('.sante-chat-panel');
    if(!body||!panel)return setTimeout(start,150);
    const shop='https://partner.mysante.com/wealthylore';
    const packageLinks={
      'Preferred Pack':{
        ph:'https://partner.mysante.com/package?ref=WEALTHYLORE&country=PH&package=preferred',
        global:'https://partner.mysante.com/package?ref=WEALTHYLORE&country=GLOBAL&package=preferred'
      },
      'Intro Pack':{
        ph:'https://partner.mysante.com/package?ref=WEALTHYLORE&country=PH&package=intro',
        global:'https://partner.mysante.com/package?ref=WEALTHYLORE&country=GLOBAL&package=intro'
      }
    };
    const live='https://api.whatsapp.com/send?phone=639613552176&text=Hi%20Lore!%20I%20would%20like%20to%20talk%20to%20you%20about%20SANT%C3%89.';
    const wa='https://api.whatsapp.com/send?phone=639613552176';
    const go=u=>location.href=u;
    const style=document.createElement('style');
    style.textContent=`.sante-chat-message{background:#f4f8f5;border:1px solid #e0e9e3;border-radius:16px;padding:15px 16px;color:#19352a;line-height:1.55}.sante-chat-options,.order-choice-grid,.order-steps{display:grid;gap:9px}.order-step{display:flex;gap:10px;padding:11px 12px;background:#fff;border:1px solid #e0e9e3;border-radius:14px;color:#31483d;line-height:1.4}.order-step b{display:grid;place-items:center;flex:0 0 25px;width:25px;height:25px;border-radius:50%;background:#176b42;color:#fff;font-size:.78rem}.order-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.shop-action,.registration-action{background:#176b42!important;color:#fff!important;border-color:#176b42!important}.sante-chat-back{text-align:center;background:#f8f8f4!important;color:#66736d!important}.package-restore{padding:72px 20px;background:#f7f8f5}.package-restore-inner{max-width:1180px;margin:auto}.package-restore h2{text-align:center;color:#19352a;font-size:clamp(2rem,5vw,3.5rem);margin:8px 0}.package-restore>div>p{text-align:center;color:#66736d;max-width:720px;margin:0 auto 30px}.package-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}.package-card{background:#fff;border:1px solid #dce6df;border-radius:28px;padding:32px;box-shadow:0 16px 42px rgba(18,54,39,.08)}.package-card.featured{border:2px solid #176b42}.package-card h3{font-size:1.8rem;color:#19352a;margin:10px 0}.package-card ul{padding-left:20px;color:#506158;line-height:1.8}.package-card button{margin-top:18px;width:100%;border:0;border-radius:999px;padding:15px 20px;background:#176b42;color:#fff;font:inherit;font-weight:800;cursor:pointer}.package-card.featured button{background:#123f2b}@media(max-width:700px){.order-actions,.package-grid{grid-template-columns:1fr}.package-restore{padding:56px 16px}}`;
    document.head.append(style);

    function showPackageLocation(pack){
      const links=packageLinks[pack];
      if(!links)return;
      const modal=document.querySelector('.location-modal'),content=modal?.querySelector('.location-content');
      if(!modal||!content){go(links.ph);return;}
      content.innerHTML=`<span class="eyebrow">CHOOSE YOUR LOCATION</span><h2>Where are you registering from?</h2><p>Select your location to continue with the ${pack}.</p><div class="location-choices"><button class="location-choice" data-ph>🇵🇭 Philippines<small>Continue to the Philippine SANTÉ registration page.</small></button><button class="location-choice" data-global>🌎 Outside the Philippines<small>Continue to the Global SANTÉ registration page.</small></button></div>`;
      modal.hidden=false;
      content.querySelector('[data-ph]').onclick=()=>{window.open(links.ph,'_blank','noopener');modal.hidden=true};
      content.querySelector('[data-global]').onclick=()=>{window.open(links.global,'_blank','noopener');modal.hidden=true};
    }

    function ensurePackages(){
      if(document.querySelector('.package-restore'))return;
      const section=document.createElement('section');section.className='package-restore';section.id='packages';
      section.innerHTML=`<div class="package-restore-inner"><span class="eyebrow">CHOOSE YOUR STARTING POINT</span><h2>Start Your SANTÉ Journey</h2><p>Choose the option that best matches your goals, then select your location to continue.</p><div class="package-grid"><article class="package-card featured"><span class="eyebrow">PREFERRED / AFFILIATE PACK</span><h3>Preferred Pack</h3><p>Start with products while exploring the affiliate path.</p><ul><li>Start your SANTÉ journey</li><li>Explore preferred / affiliate options</li><li>Choose your location before continuing</li></ul><button type="button" data-pack="Preferred Pack">Explore the Preferred Pack →</button></article><article class="package-card"><span class="eyebrow">BUSINESS PACKAGE</span><h3>Intro Pack</h3><p>Explore a business-focused starting point and the next steps available to you.</p><ul><li>Learn about the business path</li><li>Explore the Intro Pack</li><li>Choose your location before continuing</li></ul><button type="button" data-pack="Intro Pack">Explore the Intro Pack →</button></article></div></div>`;
      const business=document.querySelector('#business');
      if(business)business.insertAdjacentElement('afterend',section);else document.body.append(section);
      section.querySelectorAll('[data-pack]').forEach(btn=>btn.onclick=()=>showPackageLocation(btn.dataset.pack));
    }
    ensurePackages();

    function contacts(){body.innerHTML='<div class="sante-chat-message"><strong>Talk to Lore 👋</strong><br>Choose how you would like to connect.</div><div class="sante-chat-options"><button class="sante-chat-option" data-live>👩‍💼 Talk to Live Agent Lore</button><button class="sante-chat-option" data-wa>💬 WhatsApp</button></div><button class="sante-chat-option sante-chat-back" data-back>← Back to menu</button>';body.querySelector('[data-live]').onclick=()=>go(live);body.querySelector('[data-wa]').onclick=()=>go(wa);body.querySelector('[data-back]').onclick=main}
    function product(){body.innerHTML='<div class="sante-chat-message"><strong>🛍️ How to Shop Products</strong><br>Here is the easiest way to place a product order:</div><div class="order-steps"><div class="order-step"><b>1</b><span><strong>Open Lore’s SANTÉ partner shop</strong><br>Browse the available products.</span></div><div class="order-step"><b>2</b><span><strong>Choose your products</strong><br>Select the items and quantity you want.</span></div><div class="order-step"><b>3</b><span><strong>Complete your order</strong><br>Follow the checkout instructions shown in the shop.</span></div></div><div class="order-actions"><button class="sante-chat-option shop-action" data-shop>🛍️ Open the Shop</button><button class="sante-chat-option" data-help>👩‍💼 Ask Lore</button></div><button class="sante-chat-option sante-chat-back" data-back>← Choose another option</button>';body.querySelector('[data-shop]').onclick=()=>go(shop);body.querySelector('[data-help]').onclick=contacts;body.querySelector('[data-back]').onclick=order}
    function register(type){const pack=type==='affiliate'?'Preferred Pack':'Intro Pack',title=type==='affiliate'?'💼 Affiliate / Preferred Pack':'🚀 Business Package';body.innerHTML=`<div class="sante-chat-message"><strong>${title}</strong><br>Follow these steps to begin your registration.</div><div class="order-steps"><div class="order-step"><b>1</b><span><strong>Choose your location</strong><br>Select Philippines or Outside the Philippines.</span></div><div class="order-step"><b>2</b><span><strong>Review the package</strong><br>Check the details and complete your information.</span></div><div class="order-step"><b>3</b><span><strong>Need guidance?</strong><br>Talk to Lore before continuing.</span></div></div><div class="order-actions"><button class="sante-chat-option registration-action" data-register>Continue to Registration</button><button class="sante-chat-option" data-help>👩‍💼 Talk to Lore</button></div><button class="sante-chat-option sante-chat-back" data-back>← Choose another option</button>`;body.querySelector('[data-register]').onclick=()=>{
      /* Reuse the exact existing package-card flow so chatbot and on-page buttons can never drift apart. */
      panel.hidden=true;
      const packageButton=[...document.querySelectorAll('.package-restore [data-pack]')].find(btn=>btn.dataset.pack===pack);
      if(packageButton){packageButton.click();return;}
      showPackageLocation(pack);
    };body.querySelector('[data-help]').onclick=contacts;body.querySelector('[data-back]').onclick=order}
    function order(){body.innerHTML='<div class="sante-chat-message"><strong>📦 What would you like to order?</strong><br>Choose the option that matches what you want to do, and I’ll guide you step by step.</div><div class="order-choice-grid"><button class="sante-chat-option" data-product>🛍️ Shop Products</button><button class="sante-chat-option" data-affiliate>💼 Order / Register for Affiliate Pack</button><button class="sante-chat-option" data-business>🚀 Order / Register for Business Package</button></div><button class="sante-chat-option sante-chat-back" data-back>← Back to menu</button>';body.querySelector('[data-product]').onclick=product;body.querySelector('[data-affiliate]').onclick=()=>register('affiliate');body.querySelector('[data-business]').onclick=()=>register('business');body.querySelector('[data-back]').onclick=main}
    function main(){body.innerHTML='<div class="sante-chat-message">Hi! I can help you explore SANTÉ products, learn about the opportunity, place an order, or connect with Lore.</div><div class="sante-chat-options"><button class="sante-chat-option" data-products>🌿 Products</button><button class="sante-chat-option" data-business>💼 Business Opportunity</button><button class="sante-chat-option" data-order>📦 How to Order</button><button class="sante-chat-option" data-lore>👩‍💼 Talk to Live Agent Lore</button><button class="sante-chat-option" data-wa>💬 WhatsApp</button></div>';body.querySelector('[data-products]').onclick=()=>{document.querySelector('#products')?.scrollIntoView({behavior:'smooth'});panel.hidden=true};body.querySelector('[data-business]').onclick=()=>{document.querySelector('#business')?.scrollIntoView({behavior:'smooth'});panel.hidden=true};body.querySelector('[data-order]').onclick=order;body.querySelector('[data-lore]').onclick=()=>go(live);body.querySelector('[data-wa]').onclick=()=>go(wa)}
    main();
  };
  start();
})();
