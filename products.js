// ==========================================
// SHOPORA - PRODUCTS
// ==========================================


// ==========================================
// PRODUCT DATA
// ==========================================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 4999,
        oldPrice: 6999,
        rating: 4.8,
        icon: "🎧",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Premium wireless headphones with clear sound and comfortable design."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 6999,
        oldPrice: 8999,
        rating: 4.7,
        icon: "⌚",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description: "Modern smartwatch with fitness tracking and smart notifications."
    },

    {
        id: 3,
        name: "Premium Sneakers",
        category: "fashion",
        price: 3999,
        oldPrice: 5499,
        rating: 4.9,
        icon: "👟",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable and stylish sneakers for everyday use."
    },

    {
        id: 4,
        name: "Classic Handbag",
        category: "fashion",
        price: 3499,
        oldPrice: 4999,
        rating: 4.6,
        icon: "👜",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        description: "Elegant handbag with a modern and premium design."
    },

    {
        id: 5,
        name: "Skin Care Set",
        category: "beauty",
        price: 2499,
        oldPrice: 3299,
        rating: 4.8,
        icon: "🧴",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
        description: "Complete skincare set for your everyday beauty routine."
    },

    {
        id: 6,
        name: "Modern Table Lamp",
        category: "home",
        price: 1999,
        oldPrice: 2799,
        rating: 4.5,
        icon: "💡",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        description: "Minimal modern lamp perfect for bedrooms and workspaces."
    },

    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 2999,
        oldPrice: 3999,
        rating: 4.7,
        icon: "🔊",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        description: "Portable Bluetooth speaker with powerful and clear audio."
    },

    {
        id: 8,
        name: "Minimal Backpack",
        category: "fashion",
        price: 2899,
        oldPrice: 3999,
        rating: 4.6,
        icon: "🎒",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        description: "Stylish lightweight backpack for school, university and travel."
    },

    {
        id: 9,
        name: "Wireless Keyboard",
        category: "electronics",
        price: 3299,
        oldPrice: 4499,
        rating: 4.7,
        icon: "⌨️",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
        description: "Slim wireless keyboard with a clean modern design."
    },

    {
        id: 10,
        name: "Wireless Mouse",
        category: "electronics",
        price: 1799,
        oldPrice: 2499,
        rating: 4.6,
        icon: "🖱️",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable wireless mouse designed for everyday productivity."
    },

    {
        id: 11,
        name: "Denim Jacket",
        category: "fashion",
        price: 4599,
        oldPrice: 5999,
        rating: 4.8,
        icon: "🧥",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
        description: "Classic denim jacket with a stylish everyday look."
    },

    {
        id: 12,
        name: "Classic Sunglasses",
        category: "fashion",
        price: 1999,
        oldPrice: 2999,
        rating: 4.5,
        icon: "🕶️",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        description: "Modern sunglasses with a timeless and elegant frame."
    },

    {
        id: 13,
        name: "Perfume Collection",
        category: "beauty",
        price: 2999,
        oldPrice: 3999,
        rating: 4.8,
        icon: "🌸",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
        description: "Elegant fragrance collection with fresh and long-lasting scents."
    },

    {
        id: 14,
        name: "Makeup Essentials",
        category: "beauty",
        price: 2799,
        oldPrice: 3699,
        rating: 4.7,
        icon: "💄",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        description: "Everyday makeup essentials packed in a stylish collection."
    },

    {
        id: 15,
        name: "Ceramic Coffee Set",
        category: "home",
        price: 2299,
        oldPrice: 3199,
        rating: 4.6,
        icon: "☕",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
        description: "Elegant ceramic coffee set perfect for home and office."
    },

    {
        id: 16,
        name: "Modern Wall Clock",
        category: "home",
        price: 1899,
        oldPrice: 2699,
        rating: 4.5,
        icon: "🕐",
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
        description: "Minimal wall clock that adds a modern touch to your room."
    },

    {
        id: 17,
        name: "Portable Power Bank",
        category: "electronics",
        price: 2499,
        oldPrice: 3499,
        rating: 4.7,
        icon: "🔋",
        image: "https://images.unsplash.com/photo-1609592424717-6e8f6d6a2e2a?auto=format&fit=crop&w=800&q=80",
        description: "Compact power bank for charging your devices anywhere."
    },

    {
        id: 18,
        name: "Cotton Hoodie",
        category: "fashion",
        price: 3299,
        oldPrice: 4499,
        rating: 4.8,
        icon: "👕",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
        description: "Soft and comfortable hoodie designed for everyday wear."
    },

    {
        id: 19,
        name: "Decorative Vase",
        category: "home",
        price: 1599,
        oldPrice: 2299,
        rating: 4.4,
        icon: "🏺",
        image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
        description: "Beautiful decorative vase for modern home interiors."
    },

    {
        id: 20,
        name: "Smart LED Bulb",
        category: "home",
        price: 1299,
        oldPrice: 1899,
        rating: 4.6,
        icon: "💡",
        image: "https://images.unsplash.com/photo-1550985543-f47c80c0f5f5?auto=format&fit=crop&w=800&q=80",
        description: "Smart LED bulb with modern lighting for your home."
    }

];


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {
    return "Rs. " + Number(price).toLocaleString();
}


// ==========================================
// CALCULATE DISCOUNT
// ==========================================

function calculateDiscount(price, oldPrice) {
    return Math.round(
        ((oldPrice - price) / oldPrice) * 100
    );
}


function createProductCard(product) {

    const discount = calculateDiscount(
        product.price,
        product.oldPrice
    );

    return `
        <div class="product-card">

            <div class="product-image">

                <span class="discount-badge">
                    -${discount}%
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-real-image"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-rating">

                    <span>
                        ⭐ ${product.rating}
                    </span>

                    <span class="rating-text">
                        Excellent
                    </span>

                </div>


                <div class="product-bottom">

                    <div class="product-price">

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                        <del>
                            ${formatPrice(product.oldPrice)}
                        </del>

                    </div>


                    <button 
    type="button" 
    class="add-cart-btn" 
    onclick="
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        addToCart(${product.id});
        return false;
    "
>
    🛒
</button>

                </div>

            </div>

        </div>
    `;
}// ==========================================
// DISPLAY FEATURED PRODUCTS
// ==========================================

function displayFeaturedProducts() {

    const container =
        document.getElementById("featured-products");

    if (!container) {
        return;
    }

    const featuredProducts =
        products.slice(0, 8);

    container.innerHTML =
        featuredProducts
            .map(createProductCard)
            .join("");
}


// ==========================================
// DISPLAY ALL PRODUCTS
// ==========================================

function displayAllProducts(productList = products) {

    const container =
        document.getElementById("all-products");

    const noProducts =
        document.getElementById("no-products");

    const productCount =
        document.getElementById("product-count");

    if (!container) {
        return;
    }

    if (productList.length === 0) {

        container.innerHTML = "";

        if (noProducts) {
            noProducts.style.display = "block";
        }

        if (productCount) {
            productCount.textContent =
                "No products found";
        }

        return;
    }

    if (noProducts) {
        noProducts.style.display = "none";
    }

    container.innerHTML =
        productList
            .map(createProductCard)
            .join("");

    if (productCount) {

        productCount.textContent =
            `Showing ${productList.length} product${productList.length > 1 ? "s" : ""}`;

    }
}


// ==========================================
// SEARCH + CATEGORY FILTER
// ==========================================

function filterProducts() {

    const searchInput =
        document.getElementById("shop-search-input");

    const navSearchInput =
        document.getElementById("search-input");

    const categoryFilter =
        document.getElementById("category-filter");

    let searchText = "";

    if (
        searchInput &&
        searchInput.value.trim() !== ""
    ) {

        searchText =
            searchInput.value
                .toLowerCase()
                .trim();

    } else if (
        navSearchInput &&
        navSearchInput.value.trim() !== ""
    ) {

        searchText =
            navSearchInput.value
                .toLowerCase()
                .trim();

    }

    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";

    const filteredProducts =
        products.filter(function (product) {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText)
                ||
                product.category
                    .toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                selectedCategory === "all"
                ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;

        });

    displayAllProducts(filteredProducts);
}


// ==========================================
// SORT PRODUCTS
// ==========================================

function sortProducts() {

    const sortSelect =
        document.getElementById("sort-products");

    if (!sortSelect) {
        return;
    }

    const sortValue =
        sortSelect.value;

    let sortedProducts =
        [...products];

    if (sortValue === "low") {

        sortedProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (sortValue === "high") {

        sortedProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (sortValue === "rating") {

        sortedProducts.sort(
            (a, b) => b.rating - a.rating
        );

    }

    displayAllProducts(sortedProducts);
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const product =
        products.find(function (p) {
            return Number(p.id) === Number(productId);
        });

    if (!product) {
        return;
    }

    const existingProduct =
        cart.find(function (item) {
            return Number(item.id) === Number(productId);
        });

    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + 1;

        // Purane cart item mein image missing ho
        // to current product ki image add kar do
        existingProduct.image = product.image;
        existingProduct.name = product.name;
        existingProduct.price = product.price;
        existingProduct.oldPrice = product.oldPrice;
        existingProduct.icon = product.icon;
        existingProduct.category = product.category;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            icon: product.icon,
            image: product.image,
            category: product.category,
            quantity: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    showCartMessage(product.name);
}


// ==========================================
// CART SUCCESS MESSAGE
// ==========================================

function showCartMessage(productName) {

    const oldMessage =
        document.querySelector(".cart-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    const message =
        document.createElement("div");

    message.className =
        "cart-message";

    message.innerHTML =
        `✓ ${productName} added to cart`;

    message.style.cssText = `

        position: fixed;
        right: 25px;
        bottom: 25px;
        z-index: 9999;

        padding: 15px 22px;

        background: #18181B;
        color: white;

        border-radius: 12px;

        font-size: 14px;
        font-weight: 600;

        box-shadow: 0 15px 40px rgba(0,0,0,0.18);

        animation: cartMessageIn 0.3s ease;

    `;

    document.body.appendChild(message);

    setTimeout(function () {

        message.style.opacity = "0";

        message.style.transform =
            "translateY(10px)";

        message.style.transition =
            "0.3s ease";

        setTimeout(function () {
            message.remove();
        }, 300);

    }, 2000);
}


// ==========================================
// OPEN PRODUCT DETAILS
// ==========================================

function openProductDetails(productId) {

    window.location.href =
        "product-details.html?id=" + productId;

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayFeaturedProducts();
        displayAllProducts();

        if (typeof updateCartCount === "function") {
            updateCartCount();
        }

    }
);