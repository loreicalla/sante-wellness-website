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
    var storyCards = Array.prototype.slice.call(document.querySelectorAll('.story-card, article'));
    for (var i = 0; i < storyCards.length; i += 1) {
      var card = storyCards[i];
      var context = (card.textContent || '').replace(/\s+/g, ' ').toLowerCase();
      if (context.indexOf('wellness') === -1) continue;
      var number = card.querySelector('.story-number');
      var isStoryOne = number && (number.textContent || '').trim() === '01';
      var isWellnessStory = isStoryOne || /choosing a healthier lifestyle/.test(context);
      if (!isWellnessStory) continue;
      var trigger = card.querySelector('a.story-link, button.story-link, a, button');
      if (trigger) return trigger;
    }
    return null;
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
