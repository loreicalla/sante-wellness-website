/* Stable loader with a progressive-enhancement fallback.
   Main content must remain visible even if an enhancement script fails to load. */
(function () {
  // Repair fallback for the About/Lore section: the photo column must never
  // remain visually hidden while still reserving its full layout height.
  var layoutFix = document.createElement('style');
  layoutFix.textContent = [
    '.lore-photo.reveal{opacity:1!important;transform:none!important;visibility:visible!important}',
    '.lore-photo-frame{background:#dcebe1!important}',
    '@media (min-width:681px){.lore-section{padding-top:80px!important;padding-bottom:80px!important}}'
  ].join('');
  document.head.appendChild(layoutFix);

  // Safety first: .reveal elements are hidden by the base animation CSS.
  // Make them visible immediately so a delayed or failed script can never
  // leave the homepage blank.
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

  load('seo.js', function () {
    load('core.js', function () {
      load('lore-expert-guide.js', function () {
        load('guide-home-link.js', function () {
          load('package-images.js', function () {
            load('package-fix.js', function () {});
          });
        });
      });
    });
  });
})();
