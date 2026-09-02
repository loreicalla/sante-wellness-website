/* Stable loader with cache-busting for updated site logic. */
(function () {
  var layoutFix = document.createElement('style');
  layoutFix.textContent = [
    '.lore-section{padding-top:70px!important;padding-bottom:55px!important}',
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
                  load('chatbot.js?v=20260828', function () {});
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

/* Mobile hero safety: keep the hero content visible even if another enhancement touches reveal states. */
(function () {
  function enforceMobileHeroVisibility() {
    if (window.innerWidth > 680) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;
    hero.querySelectorAll('.hero-content, .hero-visual').forEach(function (el) {
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('transform', 'none', 'important');
    });
  }

  function init() {
    enforceMobileHeroVisibility();
    requestAnimationFrame(enforceMobileHeroVisibility);
    setTimeout(enforceMobileHeroVisibility, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
