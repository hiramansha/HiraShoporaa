const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


// ==========================================
// GET ALL PRODUCTS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const products =
            await Product.find();

        res.json({

            success: true,

            products: products

        });

    } catch (error) {

        console.error(
            "Fetch Products Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: "Failed to fetch products."

        });

    }

});


// ==========================================
// ADD PRODUCT
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            name,
            price,
            oldPrice,
            rating,
            icon,
            image,
            category,
            description,
            stock
        } = req.body;


        if (
            !name ||
            price === undefined ||
            !image ||
            !category
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, price, image and category are required."

            });

        }


        const product =
            new Product({

                name,

                price,

                oldPrice:
                    oldPrice !== undefined
                        ? oldPrice
                        : price,

                rating:
                    rating !== undefined
                        ? rating
                        : 4.5,

                icon:
                    icon || "🛍️",

                image,

                category,

                description:
                    description || "",

                stock:
                    stock !== undefined
                        ? stock
                        : 0

            });


        await product.save();


        res.status(201).json({

            success: true,

            message:
                "Product added successfully!",

            product: product

        });


    } catch (error) {

        console.error(
            "Add Product Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: "Failed to add product."

        });

    }

});


module.exports = router;