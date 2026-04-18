const express = require("express");
const Order = require("../models/orderModal");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();
// route GET /api/orders/my-orders
// get logged in user's orders
// access private

router.post("/my-orders", protect, async (req, res) => {
  try {
    // find orders for authenticated users
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); //sort by most recent orders
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// route GET /api/orders/:id
// get order details by id
// access private
router.post("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params._id).populate(
      "user",
      "name email",
    );
    if (!order) res.status(404).json({ message: "Order not found" });
    // return the full order details
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router