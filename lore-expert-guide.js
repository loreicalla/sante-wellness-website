/* Lore Expert Guide extension: loaded after the existing chatbot script. */
(function(){
  const wait=()=>{const body=document.querySelector('.sante-chat-body');if(!body)return setTimeout(wait,150);
    const observer=new MutationObserver(()=>{
      if(!body.textContent.includes('Order / Register for Affiliate Pack')&&!body.textContent.includes('Order / Register for Business Package')) return;
      body.querySelectorAll('[data-order-choice]').forEach(btn=>{
        const label=btn.textContent;
        if(label.includes('Affiliate')) btn.onclick=()=>affiliateGoal();
        if(label.includes('Business')) btn.onclick=()=>businessGoal();
      });
    }); observer.observe(body,{childList:true,subtree:true});

    function back(){ const el=[...document.querySelectorAll('.sante-chat-option')].find(b=>b.textContent.includes('Back to menu')); if(el)el.click(); }
    function contacts(){ const el=[...document.querySelectorAll('.sante-chat-option')].find(b=>b.textContent.includes('Talk to Lore')); if(el)el.click(); else back(); }
    function affiliateGoal(){body.innerHTML=`<div class="sante-chat-message"><strong>Hi, I'm Lore 👋</strong><br>Let me help you find the right starting point. What is your main goal?</div><div class="order-choice-grid"><button class="sante-chat-option" data-lore-goal="pricing">🛍️ I want better pricing</button><button class="sante-chat-option" data-lore-goal="share">🌿 I want to use and share the products</button><button class="sante-chat-option" data-lore-goal="income">💰 I want to explore earning opportunities</button></div><button class="sante-chat-option sante-chat-back" data-lore-back>← Back</button>`;body.querySelectorAll('[data-lore-goal]').forEach(b=>b.onclick=()=>recommend(b.dataset.loreGoal));body.querySelector('[data-lore-back]').onclick=back)}
    function recommend(goal){const copy={pricing:'If your goal is better pricing, I recommend exploring the Preferred / Affiliate Pack. Based on the package terms, affiliates can enjoy a 30% discount on their next purchase.',share:'Great! You can become an affiliate to enjoy the benefits while using and sharing the products. If you have bigger goals, you can also explore building a business and community.',income:'If you are looking for an additional income opportunity, you can explore product reselling and community-building. I can help you understand the next step.'}[goal];body.innerHTML=`<div class="sante-chat-message"><strong>My recommendation 🌿</strong><br>${copy}</div><div class="order-actions"><button class="sante-chat-option registration-action" data-lore-next>Continue to Registration</button><button class="sante-chat-option" data-lore-talk>👩‍💼 Talk to Lore First</button></div><button class="sante-chat-option sante-chat-back" data-lore-back>← Choose another goal</button>`;body.querySelector('[data-lore-next]').onclick=()=>document.querySelector('[data-pack="Preferred Pack"]')?.click();body.querySelector('[data-lore-talk]').onclick=contacts;body.querySelector('[data-lore-back]').onclick=affiliateGoal}
    function businessGoal(){body.innerHTML=`<div class="sante-chat-message"><strong>Hi, I'm Lore 👋</strong><br>To guide you better, what would you like to explore?</div><div class="order-choice-grid"><button class="sante-chat-option" data-business-goal="income">💵 An additional income opportunity</button><button class="sante-chat-option" data-business-goal="business">📈 Building a serious business</button><button class="sante-chat-option" data-business-goal="global">🌍 A flexible/global opportunity</button><button class="sante-chat-option" data-business-goal="talk">👩‍💼 I want to talk to Lore first</button></div><button class="sante-chat-option sante-chat-back" data-lore-back>← Back</button>`;body.querySelectorAll('[data-business-goal]').forEach(b=>b.onclick=()=>{if(b.dataset.businessGoal==='talk')contacts();else businessRecommend(b.dataset.businessGoal)});body.querySelector('[data-lore-back]').onclick=back)}
    function businessRecommend(goal){const copy={income:'You can explore earning through product reselling and by building a community around the opportunity. The Intro Pack is a practical starting point to explore the business path.',business:'If you are serious about building, we can explore the Business Package through the Intro Pack. Are you also interested in learning about franchisee opportunities?',global:'If flexibility and a broader opportunity are important to you, I can guide you through the available path and help you choose the right next step.'}[goal];body.innerHTML=`<div class="sante-chat-message"><strong>My recommendation 🚀</strong><br>${copy}</div>${goal==='business'?'<div class="order-choice-grid"><button class="sante-chat-option" data-franchise="yes">🏪 Yes, tell me about Franchise</button><button class="sante-chat-option" data-franchise="package">🚀 Show me the Business Package</button></div>':''}<div class="order-actions"><button class="sante-chat-option registration-action" data-business-next>Continue to Registration</button><button class="sante-chat-option" data-business-talk>👩‍💼 Talk to Lore First</button></div><button class="sante-chat-option sante-chat-back" data-business-back>← Choose another goal</button>`;body.querySelector('[data-business-next]').onclick=()=>document.querySelector('[data-pack="Intro Pack"]')?.click();body.querySelector('[data-business-talk]').onclick=contacts;body.querySelector('[data-business-back]').onclick=businessGoal;body.querySelector('[data-franchise="yes"]')?.addEventListener('click',contacts);body.querySelector('[data-franchise="package"]')?.addEventListener('click',()=>document.querySelector('[data-pack="Intro Pack"]')?.click())}
  }; wait();
})();

/* Promotional activity indicator — clearly presented as a popular-right-now cue, not live analytics. */
(function(){
  function start(){
    if(document.querySelector('.sante-activity-proof')) return;
    const style=document.createElement('style');
    style.textContent=`.sante-activity-proof{position:fixed;top:118px;left:18px;z-index:8500;width:min(286px,calc(100vw - 36px));display:flex;gap:11px;align-items:flex-start;padding:14px 36px 14px 14px;background:#fff;border:1px solid #dce6df;border-radius:16px;box-shadow:0 14px 35px rgba(18,54,39,.16);color:#19352a;font-family:inherit;opacity:0;transform:translateY(-10px);animation:santeProofIn .45s ease forwards}.sante-proof-icon{width:36px;height:36px;flex:0 0 36px;display:grid;place-items:center;border-radius:50%;background:#edf7f0;font-size:18px}.sante-proof-title{font-size:.92rem;font-weight:800;line-height:1.35}.sante-proof-text{margin-top:3px;font-size:.78rem;line-height:1.45;color:#66736d}.sante-proof-close{position:absolute;top:8px;right:10px;border:0;background:transparent;color:#748078;font-size:20px;line-height:1;cursor:pointer;padding:4px}.sante-proof-close:hover{color:#19352a}@keyframes santeProofIn{to{opacity:1;transform:translateY(0)}}@media(max-width:700px){.sante-activity-proof{top:82px;left:12px;width:min(278px,calc(100vw - 24px))}}`;
    document.head.append(style);
    const box=document.createElement('aside');box.className='sante-activity-proof';box.setAttribute('aria-live','polite');box.innerHTML='<div class="sante-proof-icon">🛒</div><div><div class="sante-proof-title"></div><div class="sante-proof-text"></div></div><button class="sante-proof-close" aria-label="Dismiss activity message">×</button>';
    document.body.append(box);
    let count=18, index=0, dismissed=false;
    const messages=[
      ['🛒','visitors are exploring SANTÉ options','Discover products and package choices at your own pace.'],
      ['🌿','people are checking wellness products','Explore SANTÉ products for your everyday routine.'],
      ['✨','visitors are exploring opportunities','Discover wellness options and business pathways.'],
      ['💚','people are browsing popular SANTÉ choices','See which option best matches your goals.']
    ];
    const title=box.querySelector('.sante-proof-title'),text=box.querySelector('.sante-proof-text'),icon=box.querySelector('.sante-proof-icon');
    function render(){const m=messages[index%messages.length];icon.textContent=m[0];title.textContent=`${count} ${m[1]}`;text.textContent=m[2];index++;}
    render();
    box.querySelector('.sante-proof-close').onclick=()=>{dismissed=true;box.remove();};
    function next(){if(dismissed)return;count+=Math.random()<.22?2:1;render();setTimeout(next,22000+Math.floor(Math.random()*18000));}
    setTimeout(next,22000+Math.floor(Math.random()*18000));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
