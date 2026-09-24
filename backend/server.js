const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "HiraShoporaa Backend is running!"
    });
});

// Test API route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "SHOPORA API is working successfully!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`HiraShoporaa Backend running on port ${PORT}`);
});
