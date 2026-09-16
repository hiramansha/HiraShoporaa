/* =========================
   SHOPORA - ORDERS
========================= */

document.addEventListener("DOMContentLoaded", function () {

    loadOrders();

});


/* =========================
   LOAD ORDERS
========================= */

function loadOrders() {

    const ordersContainer =
        document.getElementById("orders-container");

    if (!ordersContainer) return;


    /* Get saved orders */

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    /* Update statistics */

    updateOrderStats(orders);


    /* No orders */

    if (orders.length === 0) {

        ordersContainer.innerHTML = `
        
            <div class="empty-orders">

                <div class="empty-icon">
                    🛍️
                </div>

                <h2>No Orders Yet</h2>

                <p>
                    You haven't placed any orders yet.
                    Start shopping and your orders will appear here.
                </p>

                <a href="products.html" class="shop-now">
                    Start Shopping
                </a>

            </div>
        
        `;

        return;
    }


    /* Show newest orders first */

    const sortedOrders =
        [...orders].reverse();


    ordersContainer.innerHTML =
        sortedOrders.map(
            function (order) {

                return createOrderCard(order);

            }
        ).join("");

}


/* =========================
   ORDER STATISTICS
========================= */

function updateOrderStats(orders) {

    const totalOrders =
        document.getElementById("total-orders");

    const activeOrders =
        document.getElementById("active-orders");

    const deliveredOrders =
        document.getElementById("delivered-orders");

    const totalSpent =
        document.getElementById("total-spent");


    /* Total orders */

    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }


    /* Active orders */

    const active =
        orders.filter(
            function (order) {

                return order.status !== "Delivered";

            }
        ).length;


    if (activeOrders) {

        activeOrders.textContent =
            active;

    }


    /* Delivered orders */

    const delivered =
        orders.filter(
            function (order) {

                return order.status === "Delivered";

            }
        ).length;


    if (deliveredOrders) {

        deliveredOrders.textContent =
            delivered;

    }


    /* Total spent */

    const spent =
        orders.reduce(
            function (total, order) {

                return total +
                    (Number(order.total) || 0);

            },
            0
        );


    if (totalSpent) {

        totalSpent.textContent =
            "Rs " + spent.toLocaleString();

    }

}


/* =========================
   CREATE ORDER CARD
========================= */

function createOrderCard(order) {

    const items =
        order.items || [];


    /* First product */

    const firstItem =
        items.length > 0
            ? items[0]
            : null;


    const productName =
        firstItem
            ? firstItem.name
            : "Order Items";


    const quantity =
        firstItem
            ? (Number(firstItem.quantity) || 1)
            : items.length;


    const price =
        firstItem
            ? (Number(firstItem.price) || 0)
            : 0;


    /* More items text */

    const moreItems =
        items.length > 1
            ? `+ ${items.length - 1} more item(s)`
            : "";


    /* Status */

    const status =
        order.status || "Order Placed";


    /* Progress */

    const progress =
        getOrderProgress(status);


    return `

        <div class="order-card">

            <!-- ORDER TOP -->

            <div class="order-top">

                <div class="order-id">

                    <small>ORDER ID</small>

                    <strong>
                        ${order.orderId || "N/A"}
                    </strong>

                    <div class="order-date">
                        ${order.date || ""}
                    </div>

                </div>


                <div class="order-status">

                    ${status}

                </div>

            </div>


            <!-- PRODUCT -->

            <div class="order-product">

                <div class="product-image">

                    🛍️

                </div>


                <div class="product-details">

                    <h3>
                        ${productName}
                    </h3>

                    <p>
                        Quantity: ${quantity}
                    </p>

                    <p>
                        ${moreItems}
                    </p>

                </div>


                <div class="product-price">

                    <span>Price</span>

                    <strong>
                        Rs ${price.toLocaleString()}
                    </strong>

                </div>

            </div>


            <!-- PROGRESS -->

            <div class="order-progress">

                <div class="progress-title">
                    Order Status
                </div>


                <div class="progress-line">

                    <div class="
                        progress-step
                        ${progress >= 1 ? "active" : ""}
                    ">

                        <div class="progress-circle">
                            ✓
                        </div>

                        <span>
                            Placed
                        </span>

                    </div>


                    <div class="
                        progress-bar
                        ${progress >= 2 ? "active" : ""}
                    ">
                    </div>


                    <div class="
                        progress-step
                        ${progress >= 2 ? "active" : ""}
                    ">

                        <div class="progress-circle">
                            ✓
                        </div>

                        <span>
                            Processing
                        </span>

                    </div>


                    <div class="
                        progress-bar
                        ${progress >= 3 ? "active" : ""}
                    ">
                    </div>


                    <div class="
                        progress-step
                        ${progress >= 3 ? "active" : ""}
                    ">

                        <div class="progress-circle">
                            ✓
                        </div>

                        <span>
                            Shipped
                        </span>

                    </div>


                    <div class="
                        progress-bar
                        ${progress >= 4 ? "active" : ""}
                    ">
                    </div>


                    <div class="
                        progress-step
                        ${progress >= 4 ? "active" : ""}
                    ">

                        <div class="progress-circle">
                            ✓
                        </div>

                        <span>
                            Delivered
                        </span>

                    </div>

                </div>

            </div>


            <!-- FOOTER -->

            <div class="order-footer">

                <div class="total-box">

                    <span>
                        Order Total
                    </span>

                    <strong>
                        Rs ${(Number(order.total) || 0).toLocaleString()}
                    </strong>

                </div>


                <div class="order-buttons">

                    <a
                        href="order-tracking.html?orderId=${encodeURIComponent(order.orderId || "")}"
                        class="order-btn track-btn"
                    >
                        Track Order
                    </a>


                    <a
                        href="products.html"
                        class="order-btn details-btn"
                    >
                        Shop More
                    </a>

                </div>

            </div>

        </div>

    `;

}


/* =========================
   ORDER PROGRESS
========================= */

function getOrderProgress(status) {

    switch (status) {

        case "Order Placed":
            return 1;

        case "Processing":
            return 2;

        case "Shipped":
            return 3;

        case "Delivered":
            return 4;

        default:
            return 1;

    }

}