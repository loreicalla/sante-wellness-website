(function () {
  function initLocationPopup() {
    // Find all Explore buttons.
    const exploreButtons = document.querySelectorAll(
      '.product-card a, .product-card button, .explore-btn'
    );

    exploreButtons.forEach(function (button) {
      // Avoid attaching the same handler twice.
      if (button.dataset.locationPopupBound === 'true') return;
      button.dataset.locationPopupBound = 'true';

      // Capture the click before any existing navigation handler can run.
      button.addEventListener('click', function (event) {
        const link = button.getAttribute('href');

        if (!link || link === '#') return;

        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();

        showLocationPopup(link);
      }, true);
    });
  }

  function showLocationPopup(productLink) {
    const existingPopup = document.querySelector('.location-modal');
    if (existingPopup) existingPopup.remove();

    const modal = document.createElement('div');
    modal.className = 'location-modal';

    modal.innerHTML = `
      <div class="location-box" role="dialog" aria-modal="true" aria-label="Choose your shopping location">
        <button class="location-close" aria-label="Close">&times;</button>
        <div class="location-eyebrow">CHOOSE YOUR LOCATION</div>
        <h2>Where are you shopping from?</h2>
        <p>Select your location to continue with SANTÉ.</p>
        <div class="location-options">
          <button class="location-choice philippines">
            🇵🇭 Philippines
            <small>Continue to the Philippine SANTÉ product page.</small>
          </button>
          <button class="location-choice global">
            🌎 Outside the Philippines
            <small>Continue to the Global SANTÉ product page.</small>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.philippines').addEventListener('click', function () {
      window.location.assign(productLink);
    });

    modal.querySelector('.global').addEventListener('click', function () {
      let globalLink = productLink;

      // Philippine product codes use SPHN; corresponding Global codes use SGLN.
      globalLink = globalLink.replace(/storefront-sphn/ig, 'storefront-sgln');

      // Replace an existing country parameter, or add one if missing.
      if (/([?&])country=[^&]*/i.test(globalLink)) {
        globalLink = globalLink.replace(/([?&])country=[^&]*/i, '$1country=GLOBAL');
      } else {
        globalLink += globalLink.includes('?') ? '&country=GLOBAL' : '?country=GLOBAL';
      }

      window.location.assign(globalLink);
    });

    modal.querySelector('.location-close').addEventListener('click', function () {
      modal.remove();
    });

    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.remove();
    });
  }

  // core.js is loaded dynamically by package-fix.js. In that case DOMContentLoaded
  // may already have fired, so initialize immediately when the DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocationPopup);
  } else {
    initLocationPopup();
  }
})();
