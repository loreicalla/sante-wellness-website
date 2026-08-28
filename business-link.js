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

    // Add a small navigation guide without changing the existing business content.
    if (businessSection.querySelector('.business-quick-links')) return;

    var guide = document.createElement('div');
    guide.className = 'business-quick-links';
    guide.setAttribute('aria-label', 'Business opportunity quick links');
    guide.innerHTML =
      '<span class="business-quick-label">READY TO EXPLORE?</span>' +
      '<a href="https://partner.mysante.com/wealthylore" target="_blank" rel="noopener">🛒 How to Order</a>' +
      '<a href="#lead">🤝 How to Be an Affiliate</a>' +
      '<a href="ways-to-earn.html">💰 Discover the 5 Ways to Earn</a>';

    var anchor = businessSection.querySelector('.business-content') || businessSection.firstElementChild || businessSection;
    anchor.appendChild(guide);

    var style = document.createElement('style');
    style.textContent =
      '.business-quick-links{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;margin:28px auto 0;padding:16px 18px;max-width:760px;border:1px solid rgba(255,255,255,.2);border-radius:20px;background:rgba(255,255,255,.08)}' +
      '.business-quick-label{font-size:.78rem;letter-spacing:.12em;font-weight:800;opacity:.85;margin-right:4px}' +
      '.business-quick-links a{display:inline-flex;align-items:center;justify-content:center;padding:11px 16px;border-radius:999px;text-decoration:none;font-weight:800;background:#fff;color:#174f35;transition:transform .2s ease,box-shadow .2s ease}' +
      '.business-quick-links a:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.12)}' +
      '@media(max-width:640px){.business-quick-links{flex-direction:column}.business-quick-links a{width:100%;box-sizing:border-box}.business-quick-label{margin-bottom:2px}}';
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectBusinessCTA);
  } else {
    connectBusinessCTA();
  }
})();
