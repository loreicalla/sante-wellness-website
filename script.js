/* Stable loader with a progressive-enhancement fallback.
   Main content must remain visible even if an enhancement script fails to load. */
(function () {
  // Restore the Lore photo column. A previous layout fallback hid this entire
  // element, which is why the "Hi, I'm Lore" section lost its image.
  var layoutFix = document.createElement('style');
  layoutFix.textContent = [
    '.lore-section{padding-top:80px!important;padding-bottom:80px!important}',
    '.lore-container{display:grid!important;grid-template-columns:1.05fr .95fr!important;gap:70px!important;align-items:center!important;max-width:1200px!important}',
    '.lore-photo{display:block!important;position:relative!important;padding:20px 20px 45px 0!important;opacity:1!important;transform:none!important;visibility:visible!important}',
    '.lore-photo-frame{display:block!important;min-height:520px!important;background:#dcebe1!important;border-radius:32px!important;overflow:hidden!important}',
    '.lore-photo-frame img{display:block!important;width:100%!important;height:100%!important;min-height:520px!important;object-fit:cover!important;object-position:center!important;opacity:1!important;visibility:visible!important}',
    '.lore-content{max-width:none!important}',
    '.lore-content.reveal,.lore-photo.reveal{opacity:1!important;transform:none!important;visibility:visible!important}',
    '.wellness-section{padding-top:110px!important}',
    '@media (max-width:900px){.lore-container{grid-template-columns:1fr!important;gap:45px!important}.lore-photo{max-width:620px!important;margin:auto!important;width:100%!important}}',
    '@media (max-width:680px){.lore-photo-frame,.lore-photo-frame img{min-height:430px!important}.lore-photo-card{position:relative!important;right:auto!important;width:100%!important;margin-top:-5px!important;border-radius:0 0 20px 20px!important}}'
  ].join('');
  document.head.appendChild(layoutFix);

  // Force the existing Lore image to load again if the browser previously
  // cached a failed image request.
  var loreImage = document.querySelector('.lore-photo-frame img');
  if (loreImage) {
    loreImage.onerror = function () {
      this.src = 'images2/Lore2.png?reload=' + Date.now();
    };
  }

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