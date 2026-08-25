/* Stable loader with a progressive-enhancement fallback. */
(function () {
  var layoutFix = document.createElement('style');
  layoutFix.textContent = [
    '.lore-section{padding-top:70px!important;padding-bottom:55px!important}',
    '.lore-container{display:grid!important;grid-template-columns:1.05fr .95fr!important;max-width:1200px!important}',
    '.lore-content{max-width:none!important}',
    '.lore-photo{display:block!important}',
    '.lore-content.reveal{opacity:1!important;transform:none!important;visibility:visible!important}',
    '.wellness-section{padding-top:70px!important}',
    '@media(max-width:900px){.lore-container{grid-template-columns:1fr!important}}'
  ].join('');
  document.head.appendChild(layoutFix);

  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('visible');
  });

  function load(src, next) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = next;
    s.onerror = function () {
      console.error('Unable to load ' + src);
      if (next) next();
    };
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

  load('seo.js', function () {
    load('core.js', function () {
      load('lore-expert-guide.js', function () {
        load('guide-home-link.js', function () {
          load('package-images.js', function () {
            load('package-fix.js', function () {
              loadCss('package-polish.css', function () {});
            });
          });
        });
      });
    });
  });
})();