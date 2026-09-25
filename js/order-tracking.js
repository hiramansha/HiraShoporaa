// ==========================================
// SHOPORA - ORDER TRACKING
// MongoDB Connected Version
// ==========================================

const ORDER_API_URL =
    "https://supreme-goggles-r474rw7j7vx7cxrrg-3000.app.github.dev/api/orders";

// ==========================================
// LOAD ORDER AFTER PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const lastOrder =
        JSON.parse(localStorage.getItem("lastOrder"));

    if (!lastOrder) {
        showNoOrder();
        return;
    }

    loadOrder(lastOrder);
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
// LOAD ORDER FROM MONGODB
// ==========================================

async function loadOrder(lastOrder) {
    try {
        const orderId =
            lastOrder._id || lastOrder.id;

        if (!orderId) {
            throw new Error("Order ID not found.");
        }

        const response = await fetch(
            `${ORDER_API_URL}/${orderId}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Unable to load order."
            );
        }

        const order = data.order;

        // ==========================================
        // DISPLAY ORDER INFORMATION
        // ==========================================

        document.getElementById(
            "trackingOrderId"
        ).textContent =
            "#SHOPORA-" + order._id.slice(-10);

        document.getElementById(
            "trackingCustomer"
        ).textContent =
            order.customerName || "-";

        document.getElementById(
            "trackingDate"
        ).textContent =
            order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "-";

        document.getElementById(
            "trackingTotal"
        ).textContent =
            "Rs " +
            Number(order.totalAmount || 0).toLocaleString();

        // ==========================================
        // UPDATE STATUS
        // ==========================================

        updateTrackingStatus(order.status);

    } catch (error) {
        console.error(
            "Order Tracking Error:",
            error
        );

        document.getElementById(
            "trackingOrderId"
        ).textContent =
            "Unable to load order";

        document.getElementById(
            "trackingCustomer"
        ).textContent =
            "-";

        document.getElementById(
            "trackingDate"
        ).textContent =
            "-";

        document.getElementById(
            "trackingTotal"
        ).textContent =
            "-";
    }
}

// ==========================================
// UPDATE TRACKING STEPS
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
    // CANCELLED ORDER
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