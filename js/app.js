/* =====================================
   SHOPORA APP JAVASCRIPT
===================================== */

/* ================================
   MOBILE MENU
================================ */

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (nav) {
        nav.classList.toggle("active");
    }
}

/* ================================
   SEARCH BOX
================================ */

function toggleSearch() {

    const searchBox = document.getElementById("search-box");

    if (searchBox) {
        searchBox.classList.toggle("show");

        if (searchBox.classList.contains("show")) {
            document.getElementById("search-input").focus();
        }
    }
}

/* ================================
   CART COUNT
================================ */

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const countElement =
        document.getElementById("cart-count");

    if (countElement) {

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        countElement.textContent = totalItems;
    }
}

/* ================================
   NEWSLETTER
================================ */

function subscribeNewsletter(event) {

    event.preventDefault();

    const email =
        document.getElementById("newsletter-email").value;

    if (email) {

        localStorage.setItem(
            "newsletterEmail",
            email
        );

        alert(
            "Thank you for subscribing to SHOPORA!"
        );

        event.target.reset();
    }
}

/* ================================
   CONTACT FORM
================================ */

function submitContact(event) {

    event.preventDefault();

    const name =
        document.getElementById("contact-name").value;

    const result =
        document.getElementById("contact-result");

    result.textContent =
        `Thank you, ${name}! Your message has been received.`;

    event.target.reset();
}

/* ================================
   INITIALIZE
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

    }
);

