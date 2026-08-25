document.addEventListener('DOMContentLoaded', function () {

  // Find all Explore buttons
  const exploreButtons = document.querySelectorAll(
    '.product-card a, .product-card button, .explore-btn'
  );

  exploreButtons.forEach(function (button) {

    button.addEventListener('click', function (event) {

      const link = button.getAttribute('href');

      // Only handle buttons that actually have a destination
      if (!link) return;

      event.preventDefault();

      showLocationPopup(link);
    });

  });


  function showLocationPopup(productLink) {

    // Prevent multiple popups
    const existingPopup = document.querySelector('.location-modal');

    if (existingPopup) {
      existingPopup.remove();
    }


    const modal = document.createElement('div');

    modal.className = 'location-modal';

    modal.innerHTML = `
      <div class="location-box">

        <button class="location-close">&times;</button>

        <div class="location-eyebrow">
          CHOOSE YOUR LOCATION
        </div>

        <h2>Where are you shopping from?</h2>

        <p>
          Select your location to continue shopping with SANTÉ.
        </p>

        <div class="location-options">

          <button class="location-choice philippines">
            🇵🇭 Philippines
            <small>
              Continue to the Philippine SANTÉ product page.
            </small>
          </button>

          <button class="location-choice global">
            🌎 Outside the Philippines
            <small>
              Continue to the Global SANTÉ product page.
            </small>
          </button>

        </div>

      </div>
    `;

    document.body.appendChild(modal);


    // Philippines
    modal.querySelector('.philippines')
      .addEventListener('click', function () {

        window.location.href = productLink;

      });


    // Global
    modal.querySelector('.global')
      .addEventListener('click', function () {

        let globalLink = productLink;

        // Change Philippines URL to GLOBAL
        globalLink = globalLink.replace(
          /country=PHILIPPINES/i,
          'country=GLOBAL'
        );

        // If no country parameter exists
        if (!globalLink.includes('country=')) {

          globalLink += globalLink.includes('?')
            ? '&country=GLOBAL'
            : '?country=GLOBAL';

        }

        window.location.href = globalLink;

      });


    // Close button
    modal.querySelector('.location-close')
      .addEventListener('click', function () {

        modal.remove();

      });


    // Close when clicking outside the box
    modal.addEventListener('click', function (event) {

      if (event.target === modal) {
        modal.remove();
      }

    });

  }

});
