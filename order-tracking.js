/* =====================================
   SHOPORA ORDER TRACKING
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const order =
        JSON.parse(
            localStorage.getItem("lastOrder")
        );

    /* No order found */

    if (!order) {

        document.getElementById("trackingOrderId").textContent =
            "No Order Found";

        document.getElementById("trackingCustomer").textContent =
            "-";

        document.getElementById("trackingDate").textContent =
            "-";

        document.getElementById("trackingTotal").textContent =
            "-";

        return;
    }


    /* Order ID */

    const orderId =
        order.orderId ||
        order.id ||
        "SHOPORA-ORDER";


    document.getElementById(
        "trackingOrderId"
    ).textContent = orderId;


    /* Customer */

    const customerName =
        order.customer?.name ||
        "Customer";


    document.getElementById(
        "trackingCustomer"
    ).textContent = customerName;


    /* Date */

    document.getElementById(
        "trackingDate"
    ).textContent =
        order.date ||
        new Date().toLocaleString();


    /* Total */

    const total =
        Number(order.total) || 0;


    document.getElementById(
        "trackingTotal"
    ).textContent =
        `Rs. ${total.toLocaleString()}`;


});