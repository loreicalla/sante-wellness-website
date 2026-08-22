const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');
if (menuToggle && navLinks) {
  menuToggle.onclick = () => {
    const open = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', open);
    menuToggle.textContent = open ? '✕' : '☰';
  };
}

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

const reveal = $$('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveal.forEach(el => observer.observe(el));
} else {
  reveal.forEach(el => el.classList.add('visible'));
}

const chatStyle = document.createElement('style');
chatStyle.textContent = `
.sante-chat{position:fixed;right:24px;bottom:92px;z-index:9999;font:inherit}.sante-chat-toggle{border:0;background:#fff;color:#174;border-radius:999px;padding:14px 20px;box-shadow:0 10px 30px rgba(0,0,0,.16);font-weight:800;cursor:pointer}.sante-chat-panel{width:min(360px,calc(100vw - 32px));background:#fff;border-radius:22px;box-shadow:0 22px 60px rgba(0,0,0,.24);overflow:hidden;margin-bottom:12px}.sante-chat-panel[hidden]{display:none}.sante-chat-head{background:#126b3b;color:#fff;padding:18px}.sante-chat-head strong{display:block;font-size:1.05rem}.sante-chat-body{padding:16px}.sante-chat-message{background:#f3f7f4;color:#344;padding:12px;border-radius:14px;margin-bottom:12px;line-height:1.45}.sante-chat-options{display:grid;gap:8px}.sante-chat-option{width:100%;border:1px solid #dce8df;background:#fff;border-radius:12px;padding:12px;text-align:left;cursor:pointer;font:inherit;font-weight:700;color:#174}.sante-chat-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.facebook-option{grid-column:1/-1}.sante-chat-back{margin-top:10px;color:#667}@media(max-width:700px){.sante-chat{right:16px;bottom:82px}.sante-chat-contact-grid{grid-template-columns:1fr}}
.start-pack-section{padding:72px 20px;background:#f6faf7}.start-pack-grid{max-width:1100px;margin:28px auto 0;display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.start-pack-card{background:#fff;border:1px solid #e0ebe4;border-radius:22px;padding:24px;box-shadow:0 10px 30px rgba(16,65,38,.08)}.start-pack-card.featured{border:2px solid #198c4e}.start-pack-image{margin:-4px -4px 20px;background:#f4f8f5;border-radius:16px}.start-pack-image img{display:block;width:100%;height:auto}.start-pack-card h3{font-size:1.7rem;margin:0 0 10px;color:#174}.start-pack-card ul{padding-left:20px;color:#566;line-height:1.8}@media(max-width:700px){.start-pack-grid{grid-template-columns:1fr}}
`;
document.head.append(chatStyle);

const whatsappUrl = 'https://api.whatsapp.com/send?phone=639613552176';
const viberUrl = 'viber://chat?number=%2B639613552176';
const facebookUrl = 'https://www.messenger.com/t/santewellnessinternational';
const loreMessengerUrl = 'https://www.messenger.com/t/LorelynCIcalla';

if (!$('.sante-chat')) {
  const chat = document.createElement('div');
  chat.className = 'sante-chat';
  chat.innerHTML = `<div class="sante-chat-panel" hidden><div class="sante-chat-head"><strong>🌿 SANTÉ Wellness Assistant</strong><span>How can I help you today?</span></div><div class="sante-chat-body"></div></div><button class="sante-chat-toggle" type="button" aria-expanded="false">💬 Chat with us</button>`;
  document.body.append(chat);
  const panel = $('.sante-chat-panel');
  const toggle = $('.sante-chat-toggle');
  const body = $('.sante-chat-body');
  const go = url => { window.location.href = url; };

  const contacts = () => {
    body.innerHTML = `<div class="sante-chat-message"><strong>Talk to Lore 👋</strong><br>Choose your preferred messaging app:</div><div class="sante-chat-contact-grid"><button class="sante-chat-option" data-contact="whatsapp">💬 WhatsApp</button><button class="sante-chat-option" data-contact="viber">📞 Viber</button><button class="sante-chat-option facebook-option" data-contact="messenger">📘 Chat with Lore on Messenger</button></div><button class="sante-chat-option sante-chat-back" data-contact="back">← Back to menu</button>`;
    $$('[data-contact]').forEach(btn => btn.onclick = () => {
      const c = btn.dataset.contact;
      if (c === 'back') mainMenu();
      else if (c === 'messenger') go(loreMessengerUrl);
      else if (c === 'viber') go(viberUrl);
      else go(whatsappUrl);
    });
  };

  const mainMenu = () => {
    body.innerHTML = `<div class="sante-chat-message">Hi! I can help you explore SANTÉ products, learn about the opportunity, or connect with Lore.</div><div class="sante-chat-options"><button class="sante-chat-option" data-action="products">🌿 Products</button><button class="sante-chat-option" data-action="business">💼 Business Opportunity</button><button class="sante-chat-option" data-action="order">📦 How to Order</button><button class="sante-chat-option" data-action="lore">👩‍💼 Talk to Lore</button><button class="sante-chat-option" data-action="facebook">📘 Message us on Facebook</button><button class="sante-chat-option" data-action="whatsapp">💬 WhatsApp</button></div>`;
    $$('[data-action]').forEach(btn => btn.onclick = () => {
      const action = btn.dataset.action;
      if (action === 'products') { $('#products')?.scrollIntoView({behavior:'smooth'}); panel.hidden = true; }
      else if (action === 'business') { $('#business')?.scrollIntoView({behavior:'smooth'}); panel.hidden = true; }
      else if (action === 'order') go('https://partner.mysante.com/wealthylore');
      else if (action === 'lore') contacts();
      else if (action === 'facebook') go(facebookUrl);
      else go(whatsappUrl);
    });
  };
  toggle.onclick = () => { const open = panel.hidden; panel.hidden = !open; toggle.setAttribute('aria-expanded', open); };
  mainMenu();
}

const business = $('#business');
if (business && !$('#start-packs')) {
  const packs = document.createElement('section');
  packs.className = 'start-pack-section';
  packs.id = 'start-packs';
  packs.innerHTML = `<div class="section-heading reveal"><span class="eyebrow">CHOOSE YOUR STARTING POINT</span><h2>Start Your SANTÉ Journey</h2><p>Choose the option that best matches your goals.</p></div><div class="start-pack-grid"><article class="start-pack-card featured"><div class="start-pack-image"><img src="image/sante-barley-preferred-pack.png" alt="SANTÉ Barley Preferred Pack"></div><span class="eyebrow">PREFERRED / AFFILIATE PACK</span><h3>Start with products. Enjoy preferred pricing.</h3><ul><li>2 boxes of SANTÉ Barley Powder, 10 sachets each</li><li>Automatic registration</li><li>30% lifetime discount</li></ul><a class="btn btn-primary" href="https://partner.mysante.com/p/storefront-spha01001?ref=MTUyODc5&country=PH&flow=epackage&package=preferred" target="_blank" rel="noopener">Explore the Preferred Pack →</a></article><article class="start-pack-card"><div class="start-pack-image"><img src="image/sante-barley-intro-pack.png" alt="SANTÉ Barley Intro Pack"></div><span class="eyebrow">INTRO PACK</span><h3>Ready to take the next step?</h3><ul><li>2 boxes of SANTÉ Barley Powder, 30 sachets each</li><li>Entry option for exploring the opportunity</li><li>Choose your country before continuing</li></ul><a class="btn btn-outline" href="https://partner.mysante.com/p/storefront-spha01002?ref=MTUyODc5&country=PH&flow=epackage&package=intro" target="_blank" rel="noopener">Explore the Intro Pack →</a></article></div>`;
  business.parentNode.insertBefore(packs, business);
}
