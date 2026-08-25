(function () {
  'use strict';

  // Product-specific destinations. Add more products here as their SANTÉ storefront codes are confirmed.
  var productLinks = {
    'SANTÉ Barley Canister': {
      philippines: 'https://partner.mysante.com/shop/premium/product/storefront-sphn01005?ref=MTUyODc5&country=PH&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium',
      global: 'https://partner.mysante.com/shop/premium/product/storefront-sgln01005?ref=MTUyODc5&country=GLOBAL&sponsor=WEALTHYLORE&sponsor_name=LORELYN%20ICALLA&cart=premium'
    }
  };

  function getDestination(target) {
    var card = target.closest('.product-card');
    var title = card && card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
    var configured = productLinks[title];

    if (configured) return configured;

    // Safe fallback for products whose storefront code has not yet been configured.
    var link = target.closest('a[href]');
    if (link && link.href && link.getAttribute('href') !== '#') {
      return { philippines: link.href, global: link.href };
    }

    if (card) {
      var cardLink = card.querySelector('a[href]');
      if (cardLink && cardLink.href && cardLink.getAttribute('href') !== '#') {
        return { philippines: cardLink.href, global: cardLink.href };
      }
    }

    return null;
  }

  function ensureModalStyles() {
    if (document.getElementById('location-popup-styles')) return;

    var style = document.createElement('style');
    style.id = 'location-popup-styles';
    style.textContent = [
      '.location-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(20,32,28,.52);backdrop-filter:blur(4px)}',
      '.location-box{position:relative;width:min(540px,100%);padding:38px 36px 30px;border-radius:24px;background:#fff;color:#20362d;box-shadow:0 24px 80px rgba(0,0,0,.28)}',
      '.location-close{position:absolute;top:14px;right:18px;border:0;background:transparent;color:#20362d;font-size:32px;line-height:1;cursor:pointer}',
      '.location-eyebrow{margin-bottom:12px;font-size:11px;font-weight:800;letter-spacing:4px;color:#247247}',
      '.location-box h2{margin:0 0 12px;font-size:42px;line-height:1.12;color:#20362d}',
      '.location-box p{margin:0 0 24px;color:#52645d;font-size:16px}',
      '.location-options{display:grid;grid-template-columns:1fr 1fr;gap:14px}',
      '.location-choice{display:flex;min-height:108px;flex-direction:column;align-items:flex-start;justify-content:center;gap:8px;padding:20px;border:1px solid #d9dfdc;border-radius:16px;background:#f8faf9;color:#20362d;font-size:16px;font-weight:800;text-align:left;cursor:pointer}',
      '.location-choice:hover{border-color:#21834e;background:#f0f8f3;transform:translateY(-1px)}',
      '.location-choice small{font-size:13px;font-weight:500;line-height:1.5;color:#61716a}',
      '@media(max-width:600px){.location-box{padding:32px 22px 22px}.location-box h2{font-size:32px}.location-options{grid-template-columns:1fr}}'
    ].join('');
    document.head.appendChild(style);
  }

  function showLocationPopup(destinations) {
    var existing = document.querySelector('.location-modal');
    if (existing) existing.remove();

    ensureModalStyles();

    var modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = [
      '<div class="location-box" role="dialog" aria-modal="true" aria-label="Choose your shopping location">',
      '<button type="button" class="location-close" aria-label="Close">&times;</button>',
      '<div class="location-eyebrow">CHOOSE YOUR LOCATION</div>',
      '<h2>Where are you shopping from?</h2>',
      '<p>Select your location to continue with SANTÉ.</p>',
      '<div class="location-options">',
      '<button type="button" class="location-choice philippines">🇵🇭 Philippines<small>Continue to the Philippine SANTÉ product page.</small></button>',
      '<button type="button" class="location-choice global">🌎 Outside the Philippines<small>Continue to the Global SANTÉ product page.</small></button>',
      '</div></div>'
    ].join('');

    document.body.appendChild(modal);

    modal.querySelector('.philippines').addEventListener('click', function () {
      window.location.assign(destinations.philippines);
    });

    modal.querySelector('.global').addEventListener('click', function () {
      window.location.assign(destinations.global);
    });

    modal.querySelector('.location-close').addEventListener('click', function () {
      modal.remove();
    });

    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.remove();
    });
  }

  // Event delegation keeps Explore buttons working even when product cards are rendered after this script loads.
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('.product-card a, .product-card button, .explore-btn');
    if (!trigger) return;

    var destinations = getDestination(trigger);
    if (!destinations) return;

    event.preventDefault();
    event.stopPropagation();
    showLocationPopup(destinations);
  }, true);
})();
