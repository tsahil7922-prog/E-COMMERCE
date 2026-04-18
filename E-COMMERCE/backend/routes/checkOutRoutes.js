const express = require("express");
const CheckOut = require("../models/checkOut");
const { protect, admin } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/orderModal");
const router = express.Router();

// @route Post api/checkout
//  @desc Create a new checkout session
// @acess private
router.post("/", protect, async (req, res) => {
  const { checkOutItems, shippingAddress, totalPrice, paymentMethod } =
    req.body;
  if (!checkOutItems || checkOutItems.length === 0) {
    return res.status(400).json({ message: "no items in checkoiut" });
  }
  try {
    const newCheckOut = await CheckOut.create({
      user: {
        productId: req.user._id,
        checkOutItem: checkOutItems,
        shippingAddress,
        totalPrice,
        paymentMethod,
        isPaid: false,
      },
    });
    console.log(`CheckOut created for user:${req.user._id}`);
    res.status(201).json(newCheckOut);
  } catch (err) {
    console.error("Error creating checkout session", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT api/checkout/:id/pay
//  @desc update checkout to mark as paid after succesful payment
// @acess private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkOut = await CheckOut.findById(req.params.id);
    if (!checkOut) {
      return res.status(400).json({ message: "Checkout not found" });
    }
    if (paymentStatus === "paid") {
      checkOut.user.isPaid = true;
      checkOut.user.paymentStatus = paymentStatus;
      checkOut.user.paymentDetails = paymentDetails;
      checkOut.user.paidAt = Date.now();
      await checkOut.save();

      res.status(200).json({ checkOut });
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error." });
  }
});

// @route POST api/checkout/:id/finalize
//  @desc finalize checkout and convert to an order after payment confirmation.
// @acess private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkOut = await CheckOut.findById(req.params.id);
    if (!checkOut) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkOut.user.isPaid && !checkOut.user.isFinalized) {
      // create final order based on checkout details
      const finalOrder = await Order.create({
        user: {
          productId: checkOut.user.productId,
          checkOutItem: checkOut.user.checkOutItem,
          shippingAddress: checkOut.user.shippingAddress,
          paymentMethod: checkOut.user.paymentMethod,
          totalPrice: checkOut.user.totalPrice,
          isPaid: true,
          paidAt: checkOut.user.paidAt,
          paymentStatus: "paid",
          paymentDetails: checkOut.user.paymentDetails,
        },
      });

      //   Mark the checkout as finalized
      checkOut.user.isFinalized = true;
      checkOut.user.finalizedAt = Date.now();
      await checkOut.save();

      //   delete the cart associate with the user
      await Cart.findOneAndDelete({
        user: checkOut.user.productId,
      });
      res.status(201).json(finalOrder);
    } else if (checkOut.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ messahe: "Server Error" });
  }
});

module.exports = router;
