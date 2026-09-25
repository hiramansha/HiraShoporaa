console.log("SHOPORA CHECKOUT JS UPDATED");

// ==========================================
// SHOPORA - CHECKOUT SYSTEM
// MongoDB Connected Version
// ==========================================

const ORDER_API_URL =
    "https://cloudflare-backend.23-st-028.workers.dev/api/orders";


// ==========================================
// PLACE ORDER
// ==========================================

async function placeOrder(event) {

    if (event) {
        event.preventDefault();
    }

    // Get cart
    const checkoutCart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // ==========================================
    // CHECK CART
    // ==========================================

    if (checkoutCart.length === 0) {

        alert(
            "Your cart is empty. Please add products first."
        );

        return;
    }


    // ==========================================
    // GET FORM FIELDS
    // ==========================================

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


    // ==========================================
    // GET VALUES
    // ==========================================

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


    // ==========================================
    // VALIDATION
    // ==========================================

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

        alert(
            "Please enter your complete address."
        );

        addressInput.focus();

        return;
    }


    if (!city) {

        alert("Please enter your city.");

        cityInput.focus();

        return;
    }


    if (!paymentMethod) {

        alert(
            "Please select a payment method."
        );

        paymentInput.focus();

        return;
    }


    // ==========================================
    // CALCULATE SUBTOTAL
    // ==========================================

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


    // ==========================================
    // SHIPPING
    // ==========================================

    const shipping = 0;


    // ==========================================
    // TOTAL
    // ==========================================

    const total =
        subtotal + shipping;


    // ==========================================
    // PREPARE PRODUCTS
    // ==========================================

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
                    item.name ||
                    "Product",

                price:
                    Number(item.price) || 0,

                quantity:
                    Number(item.quantity) || 1,

                image:
                    item.image || ""

            };

        });


    // ==========================================
    // SHIPPING ADDRESS
    // ==========================================

    const shippingAddress =
        address + ", " + city;


    // ==========================================
    // ORDER DATA
    // ==========================================

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


    console.log(
        "Sending Order:",
        orderData
    );


    // ==========================================
    // SEND ORDER TO MONGODB BACKEND
    // ==========================================

    try {

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


        console.log(
            "Backend Response:",
            data
        );


        // ==========================================
        // CHECK RESPONSE
        // ==========================================

        if (
            !response.ok ||
            !data.success ||
            !data.order
        ) {

            alert(
                data.message ||
                "Failed to place order."
            );

            return;
        }


        // ==========================================
        // SAVE ACTUAL MONGODB ORDER
        // ==========================================

        const savedOrder = {

            _id:
                data.order._id,

            customerName:
                data.order.customerName,

            customerEmail:
                data.order.customerEmail,

            products:
                data.order.products,

            totalAmount:
                data.order.totalAmount,

            status:
                data.order.status,

            shippingAddress:
                data.order.shippingAddress,

            createdAt:
                data.order.createdAt

        };


        // Save latest order
        localStorage.setItem(
            "lastOrder",
            JSON.stringify(savedOrder)
        );


        console.log(
            "Saved Order:",
            savedOrder
        );


        // ==========================================
        // CLEAR CART
        // ==========================================

        localStorage.removeItem("cart");


        // ==========================================
        // SUCCESS MESSAGE
        // ==========================================

        alert(
            "Order placed successfully! 🎉"
        );


        // ==========================================
        // GO TO TRACKING PAGE
        // ==========================================

        window.location.href =
            "order-tracking.html";

    }


    // ==========================================
    // ERROR HANDLING
    // ==========================================

    catch (error) {

        console.error(
            "Order API Error:",
            error
        );

        alert(
            "Unable to connect to the server. Please try again."
        );

    }

}


// ==========================================
// SETUP CHECKOUT FORM
// ==========================================

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


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupCheckoutForm();

    }
);
