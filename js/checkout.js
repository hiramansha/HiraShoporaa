function placeOrder(event) {

    if (event) {
        event.preventDefault();
    }

    checkoutCart =
        JSON.parse(localStorage.getItem("cart")) || [];

    /* Check cart */

    if (checkoutCart.length === 0) {

        alert("Your cart is empty. Please add products first.");

        return;
    }


    /* Get form fields */

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


    /* Get values */

    const name =
        nameInput ? nameInput.value.trim() : "";

    const email =
        emailInput ? emailInput.value.trim() : "";

    const phone =
        phoneInput ? phoneInput.value.trim() : "";

    const address =
        addressInput ? addressInput.value.trim() : "";

    const city =
        cityInput ? cityInput.value.trim() : "";

    const paymentMethod =
        paymentInput ? paymentInput.value : "";


    /* Validation */

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


    /* Calculate subtotal */

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


    /* Shipping */

    const shipping = 0;


    /* Grand total */

    const total =
        subtotal + shipping;


    /* Generate Order ID */

    const orderId =
        "SHOPORA-" + Date.now();


    /* Create order */

    const order = {

        orderId: orderId,

        customer: {

            name: name,

            email: email,

            phone: phone,

            address: address,

            city: city

        },

        paymentMethod: paymentMethod,

        items: checkoutCart,

        subtotal: subtotal,

        shipping: shipping,

        total: total,

        status: "Order Placed",

        date: new Date().toLocaleString(),

        createdAt: new Date().toISOString()

    };


    /* Get existing orders */

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    /* Add new order */

    orders.push(order);


    /* Save orders */

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    /* Save latest order */

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    /* Clear cart */

    localStorage.removeItem("cart");


    /* Success message */

    alert(
        "Order placed successfully! 🎉\n\n" +
        "Order ID: " + orderId
    );


    /* Go to tracking page */

    window.location.href =
        "order-tracking.html";
}

function setupCheckoutForm() {

    const checkoutForm =
        document.getElementById("checkoutForm");

    if (!checkoutForm) return;

    checkoutForm.addEventListener(
        "submit",
        placeOrder
    );
}
