(function () {
  'use strict';

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function ensureStyles() {
    if (document.getElementById('business-cycle-modal-styles')) return;
    var style = document.createElement('style');
    style.id = 'business-cycle-modal-styles';
    style.textContent = [
      '.business-quick-links{display:none!important}',
      '.business-cycle-modal{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(10,28,20,.62);backdrop-filter:blur(6px)}',
      '.business-cycle-dialog{position:relative;width:min(920px,100%);max-height:min(86vh,860px);overflow:auto;padding:42px;border-radius:28px;background:#fff;color:#18362a;box-shadow:0 28px 90px rgba(0,0,0,.34)}',
      '.business-cycle-close{position:absolute;top:14px;right:18px;border:0;background:transparent;color:#18362a;font-size:34px;line-height:1;cursor:pointer}',
      '.business-cycle-eyebrow{font-size:11px;font-weight:800;letter-spacing:4px;color:#23854d;margin-bottom:10px}',
      '.business-cycle-dialog h2{margin:0 40px 12px 0;font-size:clamp(30px,5vw,52px);line-height:1.08;color:#18362a}',
      '.business-cycle-intro{margin:0 0 28px;max-width:720px;color:#5d6d66;line-height:1.65;font-size:16px}',
      '.business-cycle-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}',
      '.business-cycle-step{min-height:220px;padding:22px;border:1px solid #dce6df;border-radius:22px;background:#f7faf8}',
      '.business-cycle-number{display:block;margin-bottom:18px;font-size:13px;font-weight:900;letter-spacing:.12em;color:#249154}',
      '.business-cycle-step h3{margin:0 0 10px;font-size:20px;line-height:1.2;color:#18362a}',
      '.business-cycle-step p{margin:0;color:#607069;line-height:1.55;font-size:14px}',
      '.business-cycle-loop{margin-top:24px;padding:15px 18px;border-radius:16px;background:#174f35;color:#fff;text-align:center;font-weight:800}',
      '@media(max-width:760px){.business-cycle-dialog{padding:32px 20px 22px}.business-cycle-grid{grid-template-columns:1fr 1fr}.business-cycle-step{min-height:190px}}',
      '@media(max-width:520px){.business-cycle-modal{padding:12px}.business-cycle-dialog{border-radius:22px}.business-cycle-grid{grid-template-columns:1fr}.business-cycle-step{min-height:0}}'
    ].join('');
    document.head.appendChild(style);
  }

  function openBusinessCycle() {
    var existing = document.querySelector('.business-cycle-modal');
    if (existing) { existing.remove(); return; }
    ensureStyles();
    var modal = document.createElement('div');
    modal.className = 'business-cycle-modal';
    modal.innerHTML = [
      '<div class="business-cycle-dialog" role="dialog" aria-modal="true" aria-labelledby="business-cycle-title">',
      '<button type="button" class="business-cycle-close" aria-label="Close">&times;</button>',
      '<div class="business-cycle-eyebrow">HOW THE CYCLE WORKS</div>',
      '<h2 id="business-cycle-title">Build through a simple cycle of sharing.</h2>',
      '<p class="business-cycle-intro">The opportunity starts with your own experience. As you learn, share, and grow, you can help others understand the same simple process.</p>',
      '<div class="business-cycle-grid">',
      '<article class="business-cycle-step"><span class="business-cycle-number">01</span><h3>Use the Products</h3><p>Start as a product user and discover products that fit naturally into your own lifestyle and routine.</p></article>',
      '<article class="business-cycle-step"><span class="business-cycle-number">02</span><h3>Share the Products</h3><p>Share your product experience and the information you have learned with people who may be interested.</p></article>',
      '<article class="business-cycle-step"><span class="business-cycle-number">03</span><h3>Share the Business</h3><p>Introduce the business opportunity to people who want to explore products, selling, or a bigger path for growth.</p></article>',
      '<article class="business-cycle-step"><span class="business-cycle-number">04</span><h3>Teach the Community</h3><p>Help your community learn how to follow the same cycle: use, share, introduce, and teach others.</p></article>',
      '</div>',
      '<div class="business-cycle-loop">Use → Share the Products → Share the Business → Teach the Community → Repeat</div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);
    function close(){ modal.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(event){ if(event.key === 'Escape') close(); }
    modal.querySelector('.business-cycle-close').addEventListener('click', close);
    modal.addEventListener('click', function(event){ if(event.target === modal) close(); });
    document.addEventListener('keydown', onKey);
  }

  function connectBusinessCTA() {
    var businessSection = document.getElementById('business');
    if (!businessSection) return;

    /* Remove the old multi-choice block if an earlier version added it. */
    businessSection.querySelectorAll('.business-quick-links').forEach(function (el) { el.remove(); });

    /* Only the main Explore the Opportunity CTA opens the on-page popup. */
    businessSection.querySelectorAll('a, button').forEach(function (item) {
      var label = normalize(item.textContent);
      if (label.indexOf('explore the opportunity') !== -1) {
        if (item.dataset.businessCycleBound) return;
        item.dataset.businessCycleBound = 'true';
        if (item.tagName.toLowerCase() === 'a') item.setAttribute('href', '#business');
        item.addEventListener('click', function (event) {
          event.preventDefault();
          openBusinessCycle();
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectBusinessCTA);
  } else {
    connectBusinessCTA();
  }
})();
