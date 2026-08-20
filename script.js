const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => navObserver.observe(section));

// Contact buttons: Facebook, WhatsApp and Viber.
const contactButtons = document.querySelector('.contact-buttons');
if (contactButtons) {
  const contacts = [
    {
      selector: '.facebook-contact-btn',
      href: 'https://web.facebook.com/SanteWellnessInternational/',
      label: 'Message Us on Facebook',
      className: 'btn btn-primary facebook-contact-btn'
    },
    {
      selector: '.whatsapp-contact-btn',
      href: 'https://wa.me/639613552176',
      label: 'Chat on WhatsApp',
      className: 'btn btn-primary whatsapp-contact-btn'
    },
    {
      selector: '.viber-contact-btn',
      href: 'viber://chat?number=%2B639613552176',
      label: 'Chat on Viber',
      className: 'btn btn-outline viber-contact-btn'
    }
  ];

  contacts.forEach(({ selector, href, label, className }) => {
    if (!contactButtons.querySelector(selector)) {
      const button = document.createElement('a');
      button.href = href;
      button.className = className;
      button.textContent = label;
      if (href.startsWith('https://')) {
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
      }
      contactButtons.append(button);
    }
  });
}

// Add the contact number below the main contact buttons.
const contactSection = document.querySelector('#contact .contact-content');
if (contactSection && !contactSection.querySelector('.contact-number')) {
  const number = document.createElement('p');
  number.className = 'contact-number';
  number.innerHTML = 'WhatsApp &amp; Viber: <a href="https://wa.me/639613552176" target="_blank" rel="noopener noreferrer">+63 961 355 2176</a>';
  contactSection.append(number);
}

// Floating WhatsApp shortcut for quick contact on every page.
if (!document.querySelector('.floating-whatsapp')) {
  const floatingWhatsApp = document.createElement('a');
  floatingWhatsApp.href = 'https://wa.me/639613552176';
  floatingWhatsApp.target = '_blank';
  floatingWhatsApp.rel = 'noopener noreferrer';
  floatingWhatsApp.className = 'floating-whatsapp';
  floatingWhatsApp.setAttribute('aria-label', 'Chat with Lore on WhatsApp');
  floatingWhatsApp.textContent = 'WhatsApp';
  document.body.append(floatingWhatsApp);
}
