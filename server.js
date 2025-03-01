require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert ₹ to paise
            currency: "INR",
            receipt: "receipt_" + Math.random(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Error creating order: " + error });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
