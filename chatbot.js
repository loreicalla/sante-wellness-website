(function () {
  'use strict';
  if (document.getElementById('lore-chatbot-root')) return;

  var style = document.createElement('style');
  style.textContent = `
  #lore-chatbot-root{position:fixed;right:22px;bottom:22px;z-index:99990;font-family:inherit}
  .lore-chat-launcher{width:62px;height:62px;border:0;border-radius:50%;background:#19352a;color:#fff;box-shadow:0 14px 36px rgba(0,0,0,.25);cursor:pointer;font-size:25px;display:grid;place-items:center;transition:transform .2s ease}
  .lore-chat-launcher:hover{transform:translateY(-2px)}
  .lore-chat-window{position:absolute;right:0;bottom:76px;width:min(390px,calc(100vw - 32px));height:min(560px,72vh);background:#fff;border:1px solid rgba(25,53,42,.12);border-radius:24px;box-shadow:0 24px 70px rgba(0,0,0,.24);overflow:hidden;display:none;flex-direction:column}
  .lore-chat-window.open{display:flex}
  .lore-chat-header{padding:18px 18px 16px;background:#19352a;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px}
  .lore-chat-title{font-weight:800;font-size:17px}.lore-chat-subtitle{font-size:12px;opacity:.75;margin-top:3px}
  .lore-chat-close{border:0;background:rgba(255,255,255,.12);color:#fff;width:34px;height:34px;border-radius:50%;font-size:22px;cursor:pointer}
  .lore-chat-messages{flex:1;overflow:auto;padding:18px;background:#f6f8f7;display:flex;flex-direction:column;gap:10px}
  .lore-chat-message{max-width:86%;padding:11px 14px;border-radius:16px;font-size:14px;line-height:1.55;color:#34443d}
  .lore-chat-message.bot{align-self:flex-start;background:#fff;border:1px solid #e1e8e3;border-bottom-left-radius:5px}
  .lore-chat-message.user{align-self:flex-end;background:#1f7a4d;color:#fff;border-bottom-right-radius:5px}
  .lore-chat-options{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}.lore-chat-option{border:1px solid #cfe0d5;background:#fff;color:#176b42;border-radius:999px;padding:8px 11px;font-weight:700;font-size:12px;cursor:pointer}
  .lore-chat-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e3e9e5;background:#fff}.lore-chat-input{min-width:0;flex:1;border:1px solid #d7e1da;border-radius:999px;padding:11px 14px;font:inherit;outline:none}.lore-chat-input:focus{border-color:#1f7a4d}.lore-chat-send{border:0;border-radius:999px;background:#1f7a4d;color:#fff;padding:0 16px;font-weight:800;cursor:pointer}
  @media(max-width:600px){#lore-chatbot-root{right:16px;bottom:16px}.lore-chat-window{right:0;bottom:72px;width:calc(100vw - 24px);height:min(560px,75vh)}}`;
  document.head.appendChild(style);

  var root = document.createElement('div');
  root.id = 'lore-chatbot-root';
  root.innerHTML = '<div class="lore-chat-window" role="dialog" aria-label="Chat with Lore’s website guide" aria-modal="false"><div class="lore-chat-header"><div><div class="lore-chat-title">SANTÉ Guide</div><div class="lore-chat-subtitle">Ask about products or the opportunity</div></div><button class="lore-chat-close" type="button" aria-label="Close chat">×</button></div><div class="lore-chat-messages" aria-live="polite"></div><form class="lore-chat-form"><input class="lore-chat-input" type="text" placeholder="Type your question..." aria-label="Your question"><button class="lore-chat-send" type="submit">Send</button></form></div><button class="lore-chat-launcher" type="button" aria-label="Open chat">💬</button>';
  document.body.appendChild(root);

  var win = root.querySelector('.lore-chat-window');
  var messages = root.querySelector('.lore-chat-messages');
  var input = root.querySelector('.lore-chat-input');
  var launcher = root.querySelector('.lore-chat-launcher');

  function scrollMessages(){ messages.scrollTop = messages.scrollHeight; }
  function addMessage(text, who){ var m=document.createElement('div');m.className='lore-chat-message '+who;m.textContent=text;messages.appendChild(m);scrollMessages(); }
  function addOptions(options){ var wrap=document.createElement('div');wrap.className='lore-chat-options';options.forEach(function(opt){var b=document.createElement('button');b.type='button';b.className='lore-chat-option';b.textContent=opt.label;b.addEventListener('click',function(){if(opt.action==='section'){document.getElementById(opt.target)?.scrollIntoView({behavior:'smooth'});win.classList.remove('open');}else{handle(opt.label);}});wrap.appendChild(b);});messages.appendChild(wrap);scrollMessages(); }
  function greet(){messages.innerHTML='';addMessage('Hi! 👋 I’m the SANTÉ Guide for Lore’s website. I can help you explore products, learn about the business opportunity, or guide you to the right section.','bot');addOptions([{label:'Explore products',action:'section',target:'products'},{label:'Business opportunity',action:'section',target:'business'},{label:'Talk to Lore',action:'section',target:'contact'}]);}

  function handle(text){
    var q=text.toLowerCase();
    addMessage(text,'user');
    if(/hello|hi|hey/.test(q)){addMessage('Hello! What would you like to explore today—products, wellness, or the business opportunity?','bot');}
    else if(/product|barley|coffee|beauty|collagen|pad|toothpaste|fit/.test(q)){addMessage('You can explore the SANTÉ product collection by category, including wellness, coffee, beauty, and personal care. Choose “Explore products” below and I’ll take you there.','bot');addOptions([{label:'Explore products',action:'section',target:'products'}]);}
    else if(/business|opportunity|income|partner|package|affiliate|intro|starter|builder|extreme|ultimate|franchise/.test(q)){addMessage('SANTÉ offers different ways to explore the opportunity, including Affiliate/Preferred, Intro, Starter, Builder, Extreme, Ultimate, and Global Ultimate packages. Package availability and details can vary by market, so review the current information before registering.','bot');addOptions([{label:'View business options',action:'section',target:'business'},{label:'Talk to Lore',action:'section',target:'contact'}]);}
    else if(/price|cost|how much/.test(q)){addMessage('Prices and availability can vary by product, package, and location. The best next step is to select the product or package you are interested in and choose your shopping location.','bot');addOptions([{label:'Explore products',action:'section',target:'products'},{label:'Business options',action:'section',target:'business'}]);}
    else if(/order|buy|purchase|shop/.test(q)){addMessage('You can browse the products on this website and select one to continue to the appropriate SANTÉ destination for your location.','bot');addOptions([{label:'Shop products',action:'section',target:'products'}]);}
    else if(/contact|lore|help|talk/.test(q)){addMessage('Of course. You can use the contact section to connect directly with Lore.','bot');addOptions([{label:'Go to contact',action:'section',target:'contact'}]);}
    else {addMessage('I can help with SANTÉ products, shopping, wellness categories, business packages, or connecting with Lore. Try asking something like “Which products can I explore?”','bot');addOptions([{label:'Products',action:'section',target:'products'},{label:'Business',action:'section',target:'business'},{label:'Contact Lore',action:'section',target:'contact'}]);}
  }

  launcher.addEventListener('click',function(){var open=win.classList.toggle('open');if(open){if(!messages.children.length)greet();input.focus();}});
  root.querySelector('.lore-chat-close').addEventListener('click',function(){win.classList.remove('open');});
  root.querySelector('.lore-chat-form').addEventListener('submit',function(e){e.preventDefault();var text=input.value.trim();if(!text)return;input.value='';handle(text);});
})();
