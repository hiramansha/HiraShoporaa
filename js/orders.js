/* =========================
   SHOPORA - ORDERS
========================= */

const ORDER_API_URL =
    "https://supreme-goggles-r474rw7j7vx7cxrrg-3000.app.github.dev/api/orders";


document.addEventListener("DOMContentLoaded", function () {

    loadOrders();

});


/* =========================
   LOAD ORDERS FROM MONGODB
========================= */

async function loadOrders() {

    const ordersContainer =
        document.getElementById("orders-container");

    if (!ordersContainer) return;


    /* Loading */

    ordersContainer.innerHTML = `
        <div class="empty-orders">
            <div class="empty-icon">⏳</div>
            <h2>Loading Orders...</h2>
            <p>Please wait while we load your orders.</p>
        </div>
    `;


    try {

        const response =
            await fetch(ORDER_API_URL);


        const data =
            await response.json();


        console.log("Orders API Response:", data);


        if (!response.ok || !data.success) {

            throw new Error(
                data.message || "Failed to load orders."
            );

        }


        const orders =
            data.orders || [];


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

                    <a
                        href="products.html"
                        class="shop-now"
                    >
                        Start Shopping
                    </a>

                </div>

            `;

            return;

        }


        /* Update order count text */

        const ordersCountText =
            document.getElementById("orders-count-text");

        if (ordersCountText) {

            ordersCountText.textContent =
                `${orders.length} order(s) found`;

        }


        /* Newest orders first */

        const sortedOrders =
            [...orders].sort(
                function (a, b) {

                    return new Date(b.createdAt) -
                           new Date(a.createdAt);

                }
            );


        /* Display orders */

        ordersContainer.innerHTML =
            sortedOrders.map(
                function (order) {

                    return createOrderCard(order);

                }
            ).join("");


    } catch (error) {

        console.error(
            "Load Orders Error:",
            error
        );


        ordersContainer.innerHTML = `

            <div class="empty-orders">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>Unable to Load Orders</h2>

                <p>
                    ${error.message}
                </p>

                <button
                    onclick="loadOrders()"
                    class="shop-now"
                >
                    Try Again
                </button>

            </div>

        `;

    }

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

                return (
                    order.status === "Pending" ||
                    order.status === "Processing" ||
                    order.status === "Shipped"
                );

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
                    (Number(order.totalAmount) || 0);

            },
            0
        );


    if (totalSpent) {

        totalSpent.textContent =
            "Rs " +
            spent.toLocaleString();

    }

}


/* =========================
   CREATE ORDER CARD
========================= */

function createOrderCard(order) {

    const products =
        order.products || [];


    /* First product */

    const firstProduct =
        products.length > 0
            ? products[0]
            : null;


    const productName =
        firstProduct
            ? firstProduct.name
            : "Order Items";


    const quantity =
        firstProduct
            ? (Number(firstProduct.quantity) || 1)
            : products.length;


    const price =
        firstProduct
            ? (Number(firstProduct.price) || 0)
            : 0;


    /* More items */

    const moreItems =
        products.length > 1
            ? `+ ${products.length - 1} more item(s)`
            : "";


    /* Status */

    const status =
        order.status || "Pending";


    /* Progress */

    const progress =
        getOrderProgress(status);


    /* Order ID */

    const orderId =
        order._id || "N/A";


    /* Order date */

    const orderDate =
        order.createdAt
            ? new Date(
                order.createdAt
            ).toLocaleString()
            : "";


    /* Total */

    const total =
        Number(order.totalAmount) || 0;


    return `

        <div class="order-card">

            <!-- ORDER TOP -->

            <div class="order-top">

                <div class="order-id">

                    <small>
                        ORDER ID
                    </small>

                    <strong>
                        #SHOPORA-${orderId.slice(-10)}
                    </strong>

                    <div class="order-date">
                        ${orderDate}
                    </div>

                </div>


                <div class="order-status">

                    ${status}

                </div>

            </div>


            <!-- PRODUCT -->

            <div class="order-product">

                <div class="product-image">

                    ${
                        firstProduct &&
                        firstProduct.image
                            ? `<img
                                src="${firstProduct.image}"
                                alt="${productName}"
                                style="width:100%;height:100%;object-fit:cover;border-radius:12px;"
                              >`
                            : "🛍️"
                    }

                </div>


                <div class="product-details">

                    <h3>
                        ${productName}
                    </h3>

                    <p>
                        Quantity: ${quantity}
                    </p>

                    ${
                        moreItems
                            ? `<p>${moreItems}</p>`
                            : ""
                    }

                </div>


                <div class="product-price">

                    <span>
                        Price
                    </span>

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


                    <!-- PLACED -->

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


                    <!-- LINE -->

                    <div class="
                        progress-bar
                        ${progress >= 2 ? "active" : ""}
                    ">
                    </div>


                    <!-- PROCESSING -->

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


                    <!-- LINE -->

                    <div class="
                        progress-bar
                        ${progress >= 3 ? "active" : ""}
                    ">
                    </div>


                    <!-- SHIPPED -->

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


                    <!-- LINE -->

                    <div class="
                        progress-bar
                        ${progress >= 4 ? "active" : ""}
                    ">
                    </div>


                    <!-- DELIVERED -->

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
                        Rs ${total.toLocaleString()}
                    </strong>

                </div>


                <div class="order-buttons">

                    <a
                        href="order-tracking.html?orderId=${encodeURIComponent(orderId)}"
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

        case "Pending":
            return 1;

        case "Processing":
            return 2;

        case "Shipped":
            return 3;

        case "Delivered":
            return 4;

        case "Cancelled":
            return 1;

        default:
            return 1;

    }

}