/* Stable loader with cache-busting for updated site logic. */
(function () {
  var layoutFix = document.createElement('style');
  layoutFix.textContent = [
    '.lore-section{padding-top:70px!important;padding-bottom:55px!important}',
    '@media(max-width:900px){.lore-container{grid-template-columns:1fr!important}}',
    '@media(max-width:680px){.hero{gap:28px;padding-top:40px;padding-bottom:35px}.hero-visual{min-height:285px}.hero-circle{width:260px;height:260px}.hero-visual img{max-height:285px}.hero-buttons{margin-top:22px}.trust-strip div{padding:18px 16px}}'
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
