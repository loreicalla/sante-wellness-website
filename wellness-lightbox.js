/* Story #1 Wellness testimonial video lightbox. */
(function () {
  'use strict';

  var VIDEO_SRC = 'Start%20Your%20Daily%20Habbit%20Now%20with%20Sante%20Barley.mp4';
  var STYLE_ID = 'wellness-video-lightbox-styles';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.wellness-video-lightbox{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.75);backdrop-filter:blur(5px)}',
      '.wellness-video-lightbox__box{position:relative;width:min(430px,94vw);max-height:calc(100vh - 40px);background:#000;border-radius:22px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.5)}',
      '.wellness-video-lightbox__close{position:absolute;z-index:3;top:10px;right:10px;width:40px;height:40px;border:0;border-radius:50%;background:rgba(0,0,0,.72);color:#fff;font-size:28px;line-height:40px;cursor:pointer}',
      '.wellness-video-lightbox__frame{display:block;width:100%;height:min(78vh,760px);border:0;background:#000}'
    ].join('');
    document.head.appendChild(style);
  }

  function isStoryOneWellnessLink(el) {
    if (!el || !el.matches || !el.matches('a,button')) return false;
    var card = el.closest('.story-card');
    if (!card) return false;
    var number = card.querySelector('.story-number');
    var category = card.querySelector('.story-category');
    var heading = card.querySelector('h3');
    var numberText = number ? (number.textContent || '').trim() : '';
    var categoryText = category ? (category.textContent || '').trim().toLowerCase() : '';
    var headingText = heading ? (heading.textContent || '').trim().toLowerCase() : '';
    return numberText === '01' || (categoryText === 'wellness' && headingText.indexOf('choosing a healthier lifestyle') !== -1);
  }

  function openLightbox(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    }
    if (document.querySelector('.wellness-video-lightbox')) return;
    addStyles();

    var overlay = document.createElement('div');
    overlay.className = 'wellness-video-lightbox';
    overlay.innerHTML = '<div class="wellness-video-lightbox__box" role="dialog" aria-modal="true" aria-label="Wellness product benefits video">' +
      '<button type="button" class="wellness-video-lightbox__close" aria-label="Close video">&times;</button>' +
      '<video class="wellness-video-lightbox__frame" src="' + VIDEO_SRC + '" controls autoplay playsinline title="SANTÉ wellness product video"></video>' +
      '</div>';

    function close() {
      overlay.remove();
      document.body.style.overflow = '';
    }

    overlay.querySelector('.wellness-video-lightbox__close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', esc);
      }
    });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  /* Capture the click before the normal #products navigation can happen. */
  document.addEventListener('click', function (event) {
    var target = event.target && event.target.closest ? event.target.closest('a,button') : null;
    if (isStoryOneWellnessLink(target)) openLightbox(event);
  }, true);

  /* Fallback if a cached page changes to #products before this script finishes loading. */
  window.addEventListener('hashchange', function () {
    if (window.location.hash !== '#products') return;
    var story = document.querySelector('.story-card');
    if (!story) return;
    var storyOne = story.querySelector('.story-number');
    if (storyOne && (storyOne.textContent || '').trim() === '01') {
      history.replaceState(null, '', '#stories');
      openLightbox();
    }
  });
})();
