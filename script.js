const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}

const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('visible'));

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => navObserver.observe(section));
}

const whatsappUrl = 'https://api.whatsapp.com/send?phone=639613552176';

const contactButtons = document.querySelector('.contact-buttons');
if (contactButtons) {
  const contacts = [
    ['facebook-contact-btn','https://web.facebook.com/SanteWellnessInternational/','Message Us on Facebook','btn btn-primary facebook-contact-btn'],
    ['whatsapp-contact-btn', whatsappUrl,'Chat on WhatsApp','btn btn-primary whatsapp-contact-btn'],
    ['viber-contact-btn','viber://chat?number=%2B639613552176','Chat on Viber','btn btn-outline viber-contact-btn']
  ];
  contacts.forEach(([name, href, label, className]) => {
    if (contactButtons.querySelector(`.${name}`)) return;
    const a = document.createElement('a'); a.href = href; a.className = className; a.textContent = label;
    if (href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    contactButtons.append(a);
  });
}

const contactSection = document.querySelector('#contact .contact-content');
if (contactSection && !contactSection.querySelector('.contact-number')) {
  const number = document.createElement('p');
  number.className = 'contact-number';
  number.innerHTML = `WhatsApp &amp; Viber: <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">+63 961 355 2176</a>`;
  contactSection.append(number);
}

if (!document.querySelector('.floating-whatsapp')) {
  const a = document.createElement('a'); a.href = whatsappUrl; a.target = '_blank'; a.rel = 'noopener noreferrer';
  a.className = 'floating-whatsapp'; a.setAttribute('aria-label', 'Chat with Lore on WhatsApp'); a.textContent = 'WhatsApp'; document.body.append(a);
}

// Lightweight branded SANTÉ website chatbot.
if (!document.getElementById('santeChat')) {
  const chat = document.createElement('aside');
  chat.id = 'santeChat';
  chat.className = 'sante-chat';
  chat.setAttribute('aria-label', 'SANTÉ Wellness assistant');
  chat.innerHTML = `
    <button class="sante-chat-toggle" type="button" aria-expanded="false" aria-controls="santeChatPanel" aria-label="Open SANTÉ Wellness chat"><span>💬</span><b>Chat with us</b></button>
    <div class="sante-chat-panel" id="santeChatPanel" hidden>
      <div class="sante-chat-head"><div><strong>SANTÉ Wellness</strong><span>Ask about products or the opportunity</span></div><button type="button" class="sante-chat-close" aria-label="Close chat">×</button></div>
      <div class="sante-chat-body" aria-live="polite">
        <div class="sante-message bot">Hi! 👋 Welcome to SANTÉ Wellness. I can help you explore products, ordering, or the business opportunity.</div>
        <div class="sante-chat-options">
          <button type="button" data-topic="products">🌿 Products</button>
          <button type="button" data-topic="business">💼 Business Opportunity</button>
          <button type="button" data-topic="order">📦 How to Order</button>
          <button type="button" data-topic="lore">👩‍💼 Talk to Lore</button>
          <button type="button" data-topic="whatsapp">💬 WhatsApp</button>
          <button type="button" data-topic="facebook">📘 Facebook</button>
        </div>
      </div>
    </div>`;
  document.body.append(chat);
  const toggle = chat.querySelector('.sante-chat-toggle');
  const panel = chat.querySelector('.sante-chat-panel');
  const close = chat.querySelector('.sante-chat-close');
  const openChat = () => { panel.hidden = false; toggle.setAttribute('aria-expanded', 'true'); chat.classList.add('open'); };
  const closeChat = () => { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); chat.classList.remove('open'); toggle.focus(); };
  toggle.addEventListener('click', () => panel.hidden ? openChat() : closeChat());
  close.addEventListener('click', closeChat);
  chat.querySelector('.sante-chat-options').addEventListener('click', e => {
    const button = e.target.closest('[data-topic]'); if (!button) return;
    const topic = button.dataset.topic;
    const replies = {
      products: 'You can explore the featured SANTÉ wellness, coffee, beauty, and personal-care products on this website. For the current collection, you can also visit Lore’s SANTÉ partner shop.',
      business: 'The website introduces a flexible opportunity to become a SANTÉ partner, share products, learn the system, and build a community. For details, Lore can guide you directly.',
      order: 'To explore or order available products, visit Lore’s SANTÉ partner shop. If you need help choosing, you can contact Lore first.',
      lore: 'You can message Lore directly on Facebook, WhatsApp, or Viber using the contact options below.',
      whatsapp: 'Opening WhatsApp so you can chat with Lore directly.',
      facebook: 'Opening the SANTÉ Wellness International Facebook page.'
    };
    const body = chat.querySelector('.sante-chat-body');
    const user = document.createElement('div'); user.className = 'sante-message user'; user.textContent = button.textContent; body.append(user);
    if (topic === 'whatsapp') window.open(whatsappUrl, '_blank', 'noopener');
    if (topic === 'facebook') window.open('https://web.facebook.com/SanteWellnessInternational/', '_blank', 'noopener');
    const bot = document.createElement('div'); bot.className = 'sante-message bot'; bot.textContent = replies[topic]; body.append(bot);
    if (['products','order'].includes(topic)) { const a=document.createElement('a'); a.className='sante-chat-action'; a.href='https://partner.mysante.com/wealthylore'; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Explore the SANTÉ Shop →'; body.append(a); }
    if (['business','lore'].includes(topic)) { const a=document.createElement('a'); a.className='sante-chat-action'; a.href=whatsappUrl; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Chat with Lore →'; body.append(a); }
    body.scrollTop = body.scrollHeight;
  });
}
