/* Story #1 Wellness video lightbox. Isolated addition: no existing markup or styles are changed. */
(function () {
  'use strict';

  var VIDEO_ID = 'yaLC3Ms5XxE';
  var STYLE_ID = 'wellness-lightbox-styles';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.wellness-video-lightbox{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.72);backdrop-filter:blur(5px)}',
      '.wellness-video-lightbox__box{position:relative;width:min(420px,100%);max-height:calc(100vh - 48px);background:#000;border-radius:22px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.45)}',
      '.wellness-video-lightbox__close{position:absolute;z-index:2;top:10px;right:10px;width:40px;height:40px;border:0;border-radius:50%;background:rgba(0,0,0,.72);color:#fff;font-size:28px;line-height:40px;cursor:pointer}',
      '.wellness-video-lightbox__frame{display:block;width:100%;height:min(75vh,720px);border:0;background:#000}'
    ].join('');
    document.head.appendChild(style);
  }

  function openLightbox(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.querySelector('.wellness-video-lightbox')) return;
    addStyles();

    var overlay = document.createElement('div');
    overlay.className = 'wellness-video-lightbox';
    overlay.innerHTML = '<div class="wellness-video-lightbox__box" role="dialog" aria-modal="true" aria-label="Wellness product benefits video">' +
      '<button type="button" class="wellness-video-lightbox__close" aria-label="Close video">&times;</button>' +
      '<iframe class="wellness-video-lightbox__frame" src="https://www.youtube.com/embed/' + VIDEO_ID + '?autoplay=1&rel=0" title="Wellness product benefits" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>' +
      '</div>';

    function close() { overlay.remove(); }
    overlay.querySelector('.wellness-video-lightbox__close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
    document.body.appendChild(overlay);
  }

  function findWellnessButton() {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('a, button'));
    return candidates.find(function (el) {
      var text = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (!/explore\s+(product\s+)?benefits/.test(text)) return false;
      var scope = el.closest('article, .story-card, .wellness-card, .story, section, div');
      var context = scope ? (scope.textContent || '').toLowerCase() : '';
      return context.indexOf('wellness') !== -1 || candidates.filter(function (x) {
        return /explore\s+(product\s+)?benefits/.test((x.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase());
      }).indexOf(el) === 0;
    });
  }

  function bind() {
    if (document.querySelector('[data-wellness-lightbox-bound="true"]')) return true;
    var button = findWellnessButton();
    if (!button) return false;
    button.setAttribute('data-wellness-lightbox-bound', 'true');
    button.addEventListener('click', openLightbox, true);
    return true;
  }

  if (!bind()) {
    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;
      if (bind() || attempts > 30) clearInterval(timer);
    }, 250);
  }
})();
