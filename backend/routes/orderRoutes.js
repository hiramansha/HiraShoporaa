const express = require("express");
const Order = require("../models/Order");

const router = express.Router();


// ==========================================
// CREATE NEW ORDER
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            customerName,
            customerEmail,
            products,
            totalAmount,
            shippingAddress
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !customerName ||
            !customerEmail ||
            !products ||
            !Array.isArray(products) ||
            products.length === 0 ||
            totalAmount === undefined ||
            !shippingAddress
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Customer information, products, total amount and shipping address are required."
            });

        }


        // ==========================================
        // CREATE ORDER
        // ==========================================

        const order = new Order({

            customerName: customerName,

            customerEmail: customerEmail,

            products: products,

            totalAmount: Number(totalAmount),

            shippingAddress: shippingAddress

        });


        // ==========================================
        // SAVE TO MONGODB
        // ==========================================

        await order.save();


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(201).json({

            success: true,

            message: "Order placed successfully!",

            order: order

        });


    } catch (error) {

        console.error(
            "Create Order Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Failed to place order."

        });

    }

});


// ==========================================
// GET ALL ORDERS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const orders = await Order
            .find()
            .sort({ createdAt: -1 });


        res.json({

            success: true,

            orders: orders

        });


    } catch (error) {

        console.error(
            "Fetch Orders Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Failed to fetch orders."

        });

    }

});


// ==========================================
// GET SINGLE ORDER
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const order =
            await Order.findById(req.params.id);


        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found."

            });

        }


        res.json({

            success: true,

            order: order

        });


    } catch (error) {

        console.error(
            "Fetch Single Order Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Failed to fetch order."

        });

    }

});


// ==========================================
// UPDATE ORDER STATUS
// ==========================================

router.put("/:id/status", async (req, res) => {

    try {

        const { status } = req.body;


        // ==========================================
        // ALLOWED STATUSES
        // ==========================================

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];


        // ==========================================
        // STATUS VALIDATION
        // ==========================================

        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({

                success: false,

                message: "Invalid order status."

            });

        }


        // ==========================================
        // UPDATE ORDER IN MONGODB
        // ==========================================

        const order =
            await Order.findByIdAndUpdate(

                req.params.id,

                {
                    status: status
                },

                {
                    new: true,
                    runValidators: true
                }

            );


        // ==========================================
        // ORDER NOT FOUND
        // ==========================================

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found."

            });

        }


        // ==========================================
        // SUCCESS RESPONSE
        // ==========================================

        res.json({

            success: true,

            message:
                "Order status updated successfully!",

            order: order

        });


    } catch (error) {

        console.error(
            "Update Order Status Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to update order status."

        });

    }

});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;