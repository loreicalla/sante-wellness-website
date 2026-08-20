/* =========================================
   SANTE WEBSITE JAVASCRIPT
========================================= */

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    /* Close menu after clicking a link */
    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });
}

/* =========================================
   AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const cards = document.querySelectorAll(
    ".product-card, .category-card, .about-card"
);

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

cards.forEach(function (card) {
    observer.observe(card);
});

/* =========================================
   FIX BARLICCINO PRODUCT IMAGE
========================================= */

document.querySelectorAll(".product-card").forEach(function (card) {
    const title = card.querySelector("h3");
    const imageContainer = card.querySelector(".product-image");

    if (
        title &&
        imageContainer &&
        title.textContent.trim() === "SANTÉ Barliccino"
    ) {
        imageContainer.innerHTML =
            '<img src="images1/sante-barliccino.png" alt="SANTÉ Barliccino Cappuccino">';
    }
});
