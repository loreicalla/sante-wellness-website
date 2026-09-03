/* Stable loader with cache-busting for updated site logic. */
(function () {
  var layoutFix = document.createElement('style');
  layoutFix.textContent = [
    '.lore-section{padding-top:70px!important;padding-bottom:55px!important}',
    '.hero .reveal{opacity:1!important;visibility:visible!important;transform:none!important}',
    '.lore-guide-promo{display:none!important}',
    '@media(max-width:900px){.lore-container{grid-template-columns:1fr!important}}',
    '@media(max-width:680px){.hero{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:12px!important;min-height:0!important;padding-top:24px!important;padding-bottom:30px!important}.hero-visual{order:-1;min-height:230px!important;height:230px!important}.hero-circle{width:220px!important;height:220px!important}.hero-visual img{max-height:230px!important}.hero-content{width:100%}.hero h1{margin-top:12px!important;margin-bottom:18px!important}.hero p{margin-top:0!important}.hero-buttons{margin-top:20px!important}.trust-strip div{padding:18px 16px!important}.stories{padding-top:50px!important;padding-bottom:55px!important}.stories .section-heading{margin-top:0!important}}'
  ].join('');
  document.head.appendChild(layoutFix);

  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('visible');
  });

  function load(src, next) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = next;
    s.onerror = function () { if (next) next(); };
    document.head.appendChild(s);
  }

  function loadCss(href, next) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.onload = next;
    l.onerror = function () { if (next) next(); };
    document.head.appendChild(l);
  }

  load('seo.js?v=20260826', function () {
    load('core.js?v=20260826', function () {
      load('lore-expert-guide.js?v=20260826', function () {
        load('guide-home-link.js?v=20260826', function () {
          load('package-images.js?v=20260826', function () {
            load('package-fix.js?v=20260826', function () {
              load('product-flip.js?v=20260903', function () {
                loadCss('package-polish.css?v=20260826', function () {});
                loadCss('chatbot.css?v=20260828', function () {
                  load('chatbot.js?v=20260903', function () {
                    load('chatbot-human-tone.js?v=20260903', function () {});
                  });
                });
              });
            });
          });
        });
      });
    });
  });
})();

/* Preserve all existing navigation links while arranging them in the site's reading flow. */
(function () {
  function reorderNavigation() {
    var nav = document.getElementById('navLinks');
    if (!nav) return;

    var desiredOrder = ['#home', '#stories', '#about', '#products', '#business', '#lead', '#contact'];
    var links = Array.prototype.slice.call(nav.children);

    desiredOrder.forEach(function (href) {
      var link = links.find(function (item) {
        return item.getAttribute('href') === href;
      });
      if (link) nav.appendChild(link);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reorderNavigation);
  } else {
    reorderNavigation();
  }
})();

/* Mobile navigation: open/close the existing menu without changing any page content. */
(function () {
  function initMobileNavigation() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('navLinks');
    if (!toggle || !nav || toggle.dataset.menuReady === 'true') return;

    toggle.dataset.menuReady = 'true';

    function closeMenu() {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var isOpen = nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && event.target !== toggle) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNavigation);
  } else {
    initMobileNavigation();
  }
})();

/* Mobile hero safety: keep hero content visible even if another enhancement touches reveal states. */
(function () {
  function enforceMobileHeroVisibility() {
    if (window.innerWidth > 680) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;

    hero.querySelectorAll('.hero-content, .hero-visual').forEach(function (el) {
      el.classList.add('visible');
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('transform', 'none', 'important');
    });
  }

  function init() {
    enforceMobileHeroVisibility();
    requestAnimationFrame(enforceMobileHeroVisibility);
    setTimeout(enforceMobileHeroVisibility, 300);
    setTimeout(enforceMobileHeroVisibility, 1000);
    setTimeout(enforceMobileHeroVisibility, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* Connect With Me: offer direct messaging choices without changing the existing contact section. */
(function () {
  function initConnectChooser() {
    var buttons = document.querySelectorAll('.lore-buttons a.btn-primary');
    if (!buttons.length || document.getElementById('lore-connect-chooser')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#lore-connect-chooser{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(15,35,28,.38);backdrop-filter:blur(4px)}',
      '#lore-connect-chooser.open{display:flex}',
      '.lore-connect-card{width:min(430px,100%);background:#fff;border-radius:24px;padding:28px;box-shadow:0 25px 80px rgba(0,0,0,.24);position:relative}',
      '.lore-connect-close{position:absolute;right:16px;top:12px;border:0;background:transparent;color:#19352a;font-size:28px;line-height:1;cursor:pointer}',
      '.lore-connect-card h3{margin:0 35px 8px 0;color:#19352a;font-size:24px}',
      '.lore-connect-card p{margin:0 0 20px;color:#64716b;line-height:1.55}',
      '.lore-connect-options{display:grid;gap:10px}',
      '.lore-connect-option{display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;border:1px solid #d9e5de;border-radius:14px;background:#fff;color:#19352a;text-align:left;text-decoration:none;font:inherit;cursor:pointer;transition:.2s ease}',
      '.lore-connect-option:hover{border-color:#1f7a4d;transform:translateY(-1px);box-shadow:0 8px 20px rgba(31,122,77,.10)}',
      '.lore-connect-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;background:#eef7f1;font-size:20px;flex:0 0 38px}',
      '.lore-connect-option strong{display:block;font-size:15px}',
      '.lore-connect-option span{display:block;font-size:12px;color:#6b7771;margin-top:2px}',
      '@media(max-width:680px){#lore-connect-chooser{padding:16px}.lore-connect-card{padding:24px 18px;border-radius:20px}.lore-connect-card h3{font-size:21px}.lore-connect-option{padding:13px 12px}}'
    ].join('');
    document.head.appendChild(style);

    var root = document.createElement('div');
    root.id = 'lore-connect-chooser';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = '<div class="lore-connect-card" role="dialog" aria-modal="true" aria-labelledby="lore-connect-title"><button class="lore-connect-close" type="button" aria-label="Close">×</button><h3 id="lore-connect-title">How would you like to connect?</h3><p>Choose the channel that works best for you. I’ll be happy to connect with you.</p><div class="lore-connect-options"><a class="lore-connect-option" href="https://wa.me/639613552176" target="_blank" rel="noopener"><span class="lore-connect-icon">💬</span><span><strong>WhatsApp</strong><span>Chat with Lore directly</span></span></a><a class="lore-connect-option" href="viber://chat?number=%2B639613552176"><span class="lore-connect-icon">💜</span><span><strong>Viber</strong><span>Message +63 961 355 2176</span></span></a><a class="lore-connect-option" href="https://m.me/SanteWellnessInternational" target="_blank" rel="noopener"><span class="lore-connect-icon">💙</span><span><strong>Facebook Messenger</strong><span>SANTÉ Wellness International</span></span></a><button class="lore-connect-option" type="button" id="lore-connect-chat"><span class="lore-connect-icon">🤖</span><span><strong>Live Chat Assistant</strong><span>Chat with Lore’s SANTÉ Assistant</span></span></button></div></div>';
    document.body.appendChild(root);

    var close = root.querySelector('.lore-connect-close');
    function closeChooser() {
      root.classList.remove('open');
      root.setAttribute('aria-hidden', 'true');
    }
    function openChooser(event) {
      event.preventDefault();
      root.classList.add('open');
      root.setAttribute('aria-hidden', 'false');
    }

    buttons.forEach(function (button) {
      if (button.dataset.connectChooserReady === 'true') return;
      button.dataset.connectChooserReady = 'true';
      button.addEventListener('click', openChooser);
    });

    close.addEventListener('click', closeChooser);
    root.addEventListener('click', function (event) {
      if (event.target === root) closeChooser();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeChooser();
    });

    root.querySelector('#lore-connect-chat').addEventListener('click', function () {
      closeChooser();
      var launcher = document.querySelector('.lore-chat-launcher');
      if (launcher) launcher.click();
    });
  }

  function init() {
    initConnectChooser();
    setTimeout(initConnectChooser, 500);
    setTimeout(initConnectChooser, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
