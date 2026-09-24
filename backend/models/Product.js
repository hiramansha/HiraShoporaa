const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        oldPrice: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            default: 4.5
        },

        icon: {
            type: String,
            default: "🛍️"
        },

        image: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        stock: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);