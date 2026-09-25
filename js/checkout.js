console.log("SHOPORA CHECKOUT JS UPDATED");

// ==========================================
// SHOPORA - CHECKOUT SYSTEM
// ==========================================

const ORDER_API_URL =
    "https://supreme-goggles-r474rw7j7vx7cxrrg-3000.app.github.dev/api/orders";


async function placeOrder(event) {

    if (event) {
        event.preventDefault();
    }

    const checkoutCart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Check cart
    if (checkoutCart.length === 0) {

        alert(
            "Your cart is empty. Please add products first."
        );

        return;
    }


    // Get form fields
    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const phoneInput =
        document.getElementById("phone");

    const addressInput =
        document.getElementById("address");

    const cityInput =
        document.getElementById("city");

    const paymentInput =
        document.getElementById("paymentMethod");


    // Get values
    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const address =
        addressInput.value.trim();

    const city =
        cityInput.value.trim();

    const paymentMethod =
        paymentInput.value;


    // Validation
    if (!name) {
        alert("Please enter your name.");
        nameInput.focus();
        return;
    }

    if (!email) {
        alert("Please enter your email.");
        emailInput.focus();
        return;
    }

    if (!phone) {
        alert("Please enter your phone number.");
        phoneInput.focus();
        return;
    }

    if (!address) {
        alert("Please enter your complete address.");
        addressInput.focus();
        return;
    }

    if (!city) {
        alert("Please enter your city.");
        cityInput.focus();
        return;
    }

    if (!paymentMethod) {
        alert("Please select a payment method.");
        paymentInput.focus();
        return;
    }


    // Calculate subtotal
    const subtotal =
        checkoutCart.reduce(
            function (total, item) {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 1;

                return total + (price * quantity);

            },
            0
        );


    // Shipping
    const shipping = 0;

    const total =
        subtotal + shipping;


    // Prepare products for MongoDB
    const products =
        checkoutCart.map(function (item) {

            return {

                productId:
                    String(
                        item.mongoId ||
                        item.id ||
                        ""
                    ),

                name:
                    item.name || "Product",

                price:
                    Number(item.price) || 0,

                quantity:
                    Number(item.quantity) || 1,

                image:
                    item.image || ""

            };

        });


    // Shipping address
    const shippingAddress =
        address + ", " + city;


    // Order data for backend
    const orderData = {

        customerName:
            name,

        customerEmail:
            email,

        products:
            products,

        totalAmount:
            total,

        shippingAddress:
            shippingAddress

    };


    try {

        // Send order to backend
        const response =
            await fetch(
                ORDER_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(orderData)
                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            alert(
                data.message ||
                "Failed to place order."
            );

            return;
        }


        // Save latest order locally
        localStorage.setItem(
            "lastOrder",
            JSON.stringify(data.order)
        );


        // Clear cart
        localStorage.removeItem("cart");


        // Success
        alert(
            "Order placed successfully! 🎉"
        );


        // Go to tracking page
        window.location.href =
            "order-tracking.html";


    } catch (error) {

        console.error(
            "Order API Error:",
            error
        );

        alert(
            "Unable to connect to the server. Please try again."
        );
    }
}


// Setup form
function setupCheckoutForm() {

    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );

    if (!checkoutForm) {
        return;
    }

    checkoutForm.addEventListener(
        "submit",
        placeOrder
    );
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupCheckoutForm();

    }
);