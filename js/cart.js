// ==========================================
// SHOPORA CART SYSTEM
// ==========================================


// ==========================================
// GET CART FROM LOCAL STORAGE
// ==========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];
}


// ==========================================
// SAVE CART TO LOCAL STORAGE
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        function (total, item) {
            return total + Number(item.quantity || 0);
        },
        0
    );

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cart = getCart();

    const cartContainer =
        document.getElementById("cart-items");

    const emptyCart =
        document.getElementById("empty-cart");

    const cartSummary =
        document.getElementById("cart-summary");


    // If cart container does not exist
    if (!cartContainer) {
        return;
    }


    // Empty cart
    if (cart.length === 0) {

        cartContainer.innerHTML = "";

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (cartSummary) {
            cartSummary.style.display = "none";
        }

        updateCartCount();

        return;
    }


    // Hide empty cart message
    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    // Show summary
    if (cartSummary) {
        cartSummary.style.display = "block";
    }


    cartContainer.innerHTML = "";


    // ==========================================
    // CREATE CART ITEMS
    // ==========================================

    cart.forEach(function (item, index) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const total =
            price * quantity;


        const image =
            item.image ||
            "https://via.placeholder.com/150?text=SHOPORA";


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <img
                    src="${escapeCartHtml(image)}"
                    alt="${escapeCartHtml(item.name)}"
                    onerror="this.src='https://via.placeholder.com/150?text=SHOPORA';"
                >

                <div class="cart-product-info">

                    <h3>
                        ${escapeCartHtml(item.name)}
                    </h3>

                    <p>
                        ${escapeCartHtml(item.category || "Product")}
                    </p>

                    <strong>
                        $${price.toFixed(2)}
                    </strong>

                </div>

            </div>


            <div class="cart-quantity">

                <button
                    type="button"
                    onclick="decreaseCartQuantity(${index})"
                >
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button
                    type="button"
                    onclick="increaseCartQuantity(${index})"
                >
                    +
                </button>

            </div>


            <div class="cart-total">

                <strong>
                    $${total.toFixed(2)}
                </strong>

            </div>


            <button
                type="button"
                class="remove-btn"
                onclick="removeFromCart(${index})"
            >
                🗑️
            </button>

        `;


        cartContainer.appendChild(cartItem);

    });


    updateCartSummary();

    updateCartCount();
}


// ==========================================
// INCREASE CART QUANTITY
// ==========================================

function increaseCartQuantity(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(cart[index].quantity || 1) + 1;


    saveCart(cart);

    displayCart();
}


// ==========================================
// DECREASE CART QUANTITY
// ==========================================

function decreaseCartQuantity(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }


    const currentQuantity =
        Number(cart[index].quantity || 1);


    if (currentQuantity > 1) {

        cart[index].quantity =
            currentQuantity - 1;

    } else {

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();
}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);

    saveCart(cart);

    displayCart();

}


// ==========================================
// UPDATE CART SUMMARY
// ==========================================

function updateCartSummary() {

    const cart = getCart();


    const subtotal = cart.reduce(
        function (total, item) {

            return total +
                (
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                );

        },
        0
    );


    const shipping =
        subtotal > 0 ? 5 : 0;


    const grandTotal =
        subtotal + shipping;


    const subtotalElement =
        document.getElementById("subtotal");


    const shippingElement =
        document.getElementById("shipping");


    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {

        subtotalElement.textContent =
            "$" + subtotal.toFixed(2);

    }


    if (shippingElement) {

        shippingElement.textContent =
            "$" + shipping.toFixed(2);

    }


    if (totalElement) {

        totalElement.textContent =
            "$" + grandTotal.toFixed(2);

    }
}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    localStorage.removeItem("cart");

    displayCart();

    updateCartCount();
}


// ==========================================
// CHECKOUT
// ==========================================

function goToCheckout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }


    window.location.href =
        "checkout.html";
}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeCartHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

    }
);