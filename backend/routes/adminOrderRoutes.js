const express = require("express");
const router = express.Router();
const Orders = require("../models/orderModal");
const { protect, admin } = require("../middleware/authMiddleware");

// route get /api/admin/orders
// desc get all order
// private access
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Orders.find({}).populate("user", "name email");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// route put /api/admin/orders/:id
// desc update  order status
// private access
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// route delete /api/admin/orders/:id
// desc delete an  order
// private access
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({message:"Order deleted"})
    }else{
      res.status(404).json({ message: "Order not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error." });
  }
});
module.exports = router;
