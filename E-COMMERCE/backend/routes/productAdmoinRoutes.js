const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

// route get /api/admin/products
// desc get all products
// private access
router.get("/", protect, admin, async (req, res) => {
  try {
    const product = await Product.find({});
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router
