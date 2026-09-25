// ==========================================
// SHOPORA - ORDER TRACKING
// ==========================================

const ORDER_API_URL =
    "https://supreme-goggles-r474rw7j7vx7cxrrg-3000.app.github.dev/api/orders";

// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const savedOrder =
        JSON.parse(localStorage.getItem("lastOrder"));

    if (!savedOrder) {
        showNoOrder();
        return;
    }

    loadOrder(savedOrder);
});

// ==========================================
// SHOW NO ORDER
// ==========================================

function showNoOrder() {

    document.getElementById("trackingOrderId").textContent =
        "No order found";

    document.getElementById("trackingCustomer").textContent =
        "-";

    document.getElementById("trackingDate").textContent =
        "-";

    document.getElementById("trackingTotal").textContent =
        "-";
}

// ==========================================
// LOAD ORDER
// ==========================================

async function loadOrder(savedOrder) {

    try {

        const orderId =
            savedOrder._id || savedOrder.id;

        if (!orderId) {
            throw new Error("Order ID not found.");
        }

        // ==========================================
        // GET ORDER FROM BACKEND
        // ==========================================

        const response = await fetch(
            `${ORDER_API_URL}/${orderId}`
        );

        const data = await response.json();

        console.log("Order Tracking API Response:", data);

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Unable to load order."
            );
        }

        const order = data.order;

        console.log("MongoDB Order:", order);

        // ==========================================
        // ORDER ID
        // ==========================================

        document.getElementById(
            "trackingOrderId"
        ).textContent =
            "#SHOPORA-" + order._id.slice(-10);

        // ==========================================
        // CUSTOMER NAME
        // Use MongoDB first, localStorage as fallback
        // ==========================================

        const customerName =
            order.customerName ||
            savedOrder.customerName ||
            "Customer";

        document.getElementById(
            "trackingCustomer"
        ).textContent =
            customerName;

        // ==========================================
        // ORDER DATE
        // ==========================================

        const orderDate =
            order.createdAt ||
            savedOrder.createdAt;

        if (orderDate) {

            document.getElementById(
                "trackingDate"
            ).textContent =
                new Date(orderDate).toLocaleString();

        } else {

            document.getElementById(
                "trackingDate"
            ).textContent =
                "-";
        }

        // ==========================================
        // TOTAL AMOUNT
        // Use MongoDB first, localStorage as fallback
        // ==========================================

        const totalAmount =
            order.totalAmount ??
            savedOrder.totalAmount ??
            0;

        document.getElementById(
            "trackingTotal"
        ).textContent =
            "Rs " +
            Number(totalAmount).toLocaleString();

        // ==========================================
        // STATUS
        // ==========================================

        const orderStatus =
            order.status ||
            savedOrder.status ||
            "Pending";

        updateTrackingStatus(orderStatus);

    } catch (error) {

        console.error(
            "Order Tracking Error:",
            error
        );

        // ==========================================
        // FALLBACK TO LOCAL STORAGE
        // ==========================================

        const savedOrder =
            JSON.parse(localStorage.getItem("lastOrder"));

        if (savedOrder) {

            document.getElementById(
                "trackingOrderId"
            ).textContent =
                savedOrder._id
                    ? "#SHOPORA-" + savedOrder._id.slice(-10)
                    : "Order";

            document.getElementById(
                "trackingCustomer"
            ).textContent =
                savedOrder.customerName || "Customer";

            document.getElementById(
                "trackingDate"
            ).textContent =
                savedOrder.createdAt
                    ? new Date(
                        savedOrder.createdAt
                    ).toLocaleString()
                    : "-";

            document.getElementById(
                "trackingTotal"
            ).textContent =
                "Rs " +
                Number(
                    savedOrder.totalAmount || 0
                ).toLocaleString();

            updateTrackingStatus(
                savedOrder.status || "Pending"
            );

        } else {

            showNoOrder();
        }
    }
}

// ==========================================
// UPDATE TRACKING STATUS
// ==========================================

function updateTrackingStatus(status) {

    const steps =
        document.querySelectorAll(".status-step");

    const statusOrder = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered"
    ];

    const currentIndex =
        statusOrder.indexOf(status);

    steps.forEach(function (step, index) {

        step.classList.remove("active");

        if (currentIndex >= index) {
            step.classList.add("active");
        }

    });

    // ==========================================
    // CANCELLED
    // ==========================================

    if (status === "Cancelled") {

        steps.forEach(function (step) {
            step.classList.remove("active");
        });

        if (steps.length > 0) {

            steps[0].classList.add("active");

            const heading =
                steps[0].querySelector("h3");

            const paragraph =
                steps[0].querySelector("p");

            if (heading) {
                heading.textContent =
                    "Order Cancelled";
            }

            if (paragraph) {
                paragraph.textContent =
                    "This order has been cancelled.";
            }
        }
    }
}