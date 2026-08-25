/* Stable loader with a progressive-enhancement fallback.
   Main content must remain visible even if an enhancement script fails to load. */
(function () {
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
