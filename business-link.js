(function () {
  'use strict';

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function connectBusinessCTA() {
    var businessSection = document.getElementById('business');
    if (!businessSection) return;

    var links = businessSection.querySelectorAll('a, button');
    links.forEach(function (item) {
      var label = normalize(item.textContent);
      if (label.indexOf('explore the opportunity') !== -1 || label.indexOf('discover 5 ways to earn') !== -1 || label === 'learn more →' || label === 'learn more') {
        if (item.tagName.toLowerCase() === 'a') {
          item.setAttribute('href', 'ways-to-earn.html');
        } else {
          item.addEventListener('click', function () {
            window.location.href = 'ways-to-earn.html';
          });
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectBusinessCTA);
  } else {
    connectBusinessCTA();
  }
})();
