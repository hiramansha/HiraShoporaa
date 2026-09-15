// ==========================================
// SHOPORA - CART SYSTEM
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productId) {

    const product = products.find(function(item) {
        return Number(item.id) === Number(productId);
    });

    if (!product) {
        alert("Product not found!");
        return;
    }

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(function(item) {
        return Number(item.id) === Number(productId);
    });

    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(product.name + " added to cart!");
}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(function(total, item) {

        return total + Number(item.quantity || 0);

    }, 0);

    cartCount.textContent = totalItems;
}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(productId) {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(function(item) {

        return Number(item.id) !== Number(productId);

    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(productId, change) {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = cart.find(function(item) {

        return Number(item.id) === Number(productId);

    });

    if (!product) {
        return;
    }

    product.quantity =
        Number(product.quantity || 0) + Number(change);

    if (product.quantity <= 0) {

        removeFromCart(productId);
        return;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cartContainer =
        document.getElementById("cart-items");

    if (!cartContainer) {
        return;
    }

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add some products to your cart.</p>

                <a href="products.html">
                    Continue Shopping
                </a>
            </div>
        `;

        updateCartSummary();
        return;
    }

    cartContainer.innerHTML = cart.map(function(item) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const itemTotal =
            price * quantity;

        return `
            <div class="cart-item">

                <img
                    src="${item.image || ""}"
                    alt="${item.name || "Product"}"
                >

                <div class="cart-item-info">

                    <h3>
                        ${item.name || "Product"}
                    </h3>

                    <p>
                        Price:
                        Rs. ${price.toLocaleString()}
                    </p>

                    <div class="quantity-controls">

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <p>
                        Item Total:
                        <strong>
                            Rs. ${itemTotal.toLocaleString()}
                        </strong>
                    </p>

                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;

    }).join("");

    updateCartSummary();
}


// ==========================================
// CART SUMMARY
// ==========================================

function updateCartSummary() {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const totalItemsElement =
        document.getElementById("cart-total-items");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const totalElement =
        document.getElementById("cart-total");

    const totalItems = cart.reduce(function(total, item) {

        return total + Number(item.quantity || 0);

    }, 0);

    const subtotal = cart.reduce(function(total, item) {

        return total +
            (
                Number(item.price || 0) *
                Number(item.quantity || 0)
            );

    }, 0);

    if (totalItemsElement) {
        totalItemsElement.textContent = totalItems;
    }

    if (subtotalElement) {
        subtotalElement.textContent =
            "Rs. " + subtotal.toLocaleString();
    }

    if (totalElement) {
        totalElement.textContent =
            "Rs. " + subtotal.toLocaleString();
    }
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();
    displayCart();

});
