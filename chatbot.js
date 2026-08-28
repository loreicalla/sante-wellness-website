(function(){
'use strict';
if(document.getElementById('lore-chatbot-root')) return;

var style=document.createElement('style');
style.textContent=`
#lore-chatbot-root{position:fixed;right:22px;bottom:22px;z-index:99990;font-family:inherit}
.lore-chat-launcher{width:64px;height:64px;border:0;border-radius:50%;background:#19352a;color:#fff;box-shadow:0 14px 36px rgba(0,0,0,.25);cursor:pointer;font-size:25px;position:relative}
.lore-chat-launcher:after{content:"";position:absolute;width:13px;height:13px;border-radius:50%;background:#43c276;border:3px solid #fff;right:2px;top:2px}
.lore-chat-window{position:absolute;right:0;bottom:78px;width:min(400px,calc(100vw - 28px));height:min(570px,74vh);background:#fff;border-radius:24px;box-shadow:0 24px 70px rgba(0,0,0,.24);overflow:hidden;display:none;flex-direction:column}
.lore-chat-window.open{display:flex}.lore-chat-header{padding:16px;background:#19352a;color:#fff;display:flex;justify-content:space-between}.lore-chat-title{font-weight:800}.lore-chat-subtitle{font-size:12px;margin-top:4px}.online{color:#8df0ae}.lore-chat-close{border:0;background:transparent;color:#fff;font-size:25px;cursor:pointer}.lore-chat-messages{flex:1;overflow:auto;padding:18px;background:#f6f8f7;display:flex;flex-direction:column;gap:10px}.lore-chat-message{max-width:86%;padding:11px 14px;border-radius:16px;font-size:14px;line-height:1.55}.bot{align-self:flex-start;background:#fff;border-bottom-left-radius:4px}.user{align-self:flex-end;background:#1f7a4d;color:#fff;border-bottom-right-radius:4px}.lore-chat-options{display:flex;flex-wrap:wrap;gap:7px}.lore-chat-option{border:1px solid #cfe0d5;background:#fff;color:#176b42;border-radius:999px;padding:8px 11px;font-weight:700;font-size:12px;cursor:pointer}.lore-chat-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e3e9e5}.lore-chat-input{flex:1;min-width:0;border:1px solid #d7e1da;border-radius:999px;padding:11px 14px;font:inherit}.lore-chat-send{border:0;border-radius:999px;background:#1f7a4d;color:#fff;padding:0 16px;font-weight:800;cursor:pointer}@media(max-width:600px){#lore-chatbot-root{right:16px;bottom:16px}}
`;
document.head.appendChild(style);

var root=document.createElement('div');root.id='lore-chatbot-root';
root.innerHTML='<div class="lore-chat-window" role="dialog" aria-label="Chat with Lore’s SANTÉ assistant"><div class="lore-chat-header"><div><div class="lore-chat-title">Lore’s SANTÉ Assistant</div><div class="lore-chat-subtitle"><span class="online">● Online now</span> · Usually replies in minutes</div></div><button class="lore-chat-close" aria-label="Close chat">×</button></div><div class="lore-chat-messages" aria-live="polite"></div><form class="lore-chat-form"><input class="lore-chat-input" placeholder="Type your question..." aria-label="Your question"><button class="lore-chat-send">Send</button></form></div><button class="lore-chat-launcher" aria-label="Chat with Lore’s SANTÉ assistant">💬</button>';
document.body.appendChild(root);

var win=root.querySelector('.lore-chat-window'),messages=root.querySelector('.lore-chat-messages'),input=root.querySelector('input');
function add(t,w){var m=document.createElement('div');m.className='lore-chat-message '+w;m.textContent=t;messages.appendChild(m);messages.scrollTop=messages.scrollHeight}
function opts(a){var d=document.createElement('div');d.className='lore-chat-options';a.forEach(function(x){var b=document.createElement('button');b.className='lore-chat-option';b.type='button';b.textContent=x;b.onclick=function(){handle(x)};d.appendChild(b)});messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
function menu(){opts(['🌿 Explore Products','💼 Business Opportunity','📦 How to Order','👩‍💼 Talk to Lore'])}
function goHome(section){location.href='/?'+section}
function greet(){add('Hi! 👋 Welcome. I’m Lore’s SANTÉ Assistant. I can guide you through the website and help you find the information you need. What would you like to explore?','bot');menu()}
function handle(t){add(t,'user');var q=t.toLowerCase();
 if(q.includes('open 5 ways')||q.includes('explore the 5 ways')){location.href='/ways-to-earn.html';return}
 if(q.includes('go to products')){goHome('products');return}
 if(q.includes('go to business')){goHome('business');return}
 if(q.includes('go to contact')){goHome('contact');return}
 setTimeout(function(){
  if(q.includes('back to menu')){add('Sure! What would you like to explore next?','bot');menu()}
  else if(q.includes('explore products')||q.includes('product')||q.includes('barley')||q.includes('coffee')){add('Absolutely! 🌿 You can explore the wellness products and choose what fits your lifestyle.','bot');opts(['Go to Products','Back to Menu'])}
  else if(q.includes('business opportunity')||q==='business'){
   add('The SANTÉ business opportunity can be explored around your lifestyle. Would you like to know how to become an Affiliate, or how earning in the business works?','bot');opts(['How to Become an Affiliate','💰 How to Earn in the Business','Talk to Lore','Back to Menu'])
  }
  else if(q.includes('affiliate')||q.includes('business owner')||q.includes('become an')){
   add('🌿 HOW TO BECOME AN AFFILIATE\n\nIf you enjoy using SANTÉ products and would also like to earn from sharing or selling them, becoming an Affiliate may be a good fit for you.\n\nAs a SANTÉ Affiliate, you can earn 30% retail profit, and your Affiliate status is lifetime.\n\nThis option is ideal if you mainly want to consume the products, share them with others, and earn from retail sales.\n\nBut if you are interested in learning about bigger income potential and building a business, you can also talk directly with Lore, a live agent, to explore the available options.','bot');opts(['💰 How to Earn in the Business','👩‍💼 Talk to Lore','Back to Menu'])
  }
  else if(q.includes('how to earn in the business')||q.includes('how to earn')||q.includes('earn in business')){
   add('There are different ways earning may work within the SANTÉ business program, depending on qualifying sales, sponsorship, team development, rank and the applicable program rules. The website has a dedicated visual guide with simple sample computations to help explain the five earning opportunities.','bot');opts(['📊 Explore the 5 Ways to Earn','How to Become an Affiliate','Talk to Lore','Back to Menu'])
  }
  else if(q.includes('5 ways')||q.includes('retail bonus')||q.includes('fast start')||q.includes('infinity bonus')||q.includes('leadership bonus')||q.includes('dream quest')){
   add('The 5 Ways to Earn page explains Retail Bonus, Fast Start Bonus, Infinity Bonus, Leadership Bonus and Dream Quest using visual examples and sample computations for illustration. Actual earnings depend on qualifications and applicable SANTÉ program rules.','bot');opts(['📊 Explore the 5 Ways to Earn','💰 How to Earn in the Business','Back to Menu'])
  }
  else if(q.includes('how to order')||q.includes('order')||q.includes('buy')){
   add('📦 I can help you order. You can explore the products first, then use Lore’s SANTÉ partner shop to place your order. If you need help choosing, you can also talk directly with Lore.','bot');opts(['Go to Products','Talk to Lore','Back to Menu'])
  }
  else if(q.includes('talk to lore')||q.includes('lore')||q.includes('human')||q.includes('agent')){
   add('Of course 😊 Lore can personally help you with products, ordering, or exploring the business opportunity.','bot');opts(['Go to Contact','Back to Menu'])
  }
  else{add('I’m here to help 😊 You can explore products, learn about the business opportunity, find out how to order, or talk directly with Lore.','bot');menu()}
 },350)
}
root.querySelector('.lore-chat-launcher').onclick=function(){win.classList.toggle('open');if(win.classList.contains('open')&&!messages.children.length)greet();if(win.classList.contains('open'))input.focus()};
root.querySelector('.lore-chat-close').onclick=function(){win.classList.remove('open')};
root.querySelector('form').onsubmit=function(e){e.preventDefault();var t=input.value.trim();if(t){input.value='';handle(t)}};
})();