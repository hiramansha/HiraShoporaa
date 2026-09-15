// SHOPORA - GENERAL SCRIPT
// ===============================
// Mobile Navigation
function toggleMenu() {

    const navLinks = document.querySelector(".nav-links");

    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

// Close mobile menu when a link is clicked
document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const menu = document.querySelector(".nav-links");

            if (menu) {
                menu.classList.remove("active");
            }

        });

    });

});

// ===============================
// SMOOTH SCROLL
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});
// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(
        ".section, .category-card, .product-card, .feature-card, .about-card"
    );

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elements.forEach(function (element) {

        observer.observe(element);

    });

});
// ===============================
// CURRENT YEAR
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });

});
