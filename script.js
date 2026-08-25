/* Stable loader with a progressive-enhancement fallback.
   Main content must remain visible even if an enhancement script fails to load. */
(function () {
  // Layout repair: the Lore photo asset can fail or remain blank while its
  // fixed-height column still reserves a large area. Keep the text section
  // compact instead of leaving an empty visual block.
  var layoutFix = document.createElement('style');
  layoutFix.textContent = [
    '.lore-section{padding-top:70px!important;padding-bottom:55px!important}',
    '.lore-container{display:block!important;max-width:900px!important}',
    '.lore-photo{display:none!important}',
    '.lore-content{max-width:900px!important}',
    '.lore-content.reveal{opacity:1!important;transform:none!important;visibility:visible!important}',
    '.wellness-section{padding-top:70px!important}'
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
