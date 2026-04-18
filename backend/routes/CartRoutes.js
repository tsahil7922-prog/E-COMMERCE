const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by user Id or Guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc..Add a product to the cart for the guest User
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // if the user is logged in or guest
    let cart = await getCart(userId, guestId);

    // If the cart exists ,update
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );
      const qty = Number(quantity);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += qty;
      } else {
        // add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url,
          price: product.price,
          size,
          color,
          quantity: qty,
        });
      }
      //   Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,

            color,
            size,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error." });
  }
});

// @route PUT /api//cart
// @desc... update product quantity in the cart for guest or logged-in user
// access public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );
    if (productIndex > -1) {
      // update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice[(productIndex, 1)]; // remove product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(201).json(cart);
    } else {
      return res.status(401).json({ message: "Product not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error." });
  }
});

// @route delete /api//cart
// @desc... delete product
// access public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error." });
  }
});

// @route get /api//cart
// @desc... get logged in user or logged in user cart
// access public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    let cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart is not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error." });
  }
});

// @route post /api//cart
// @desc... merger guest card into user card on login
// access private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    // find the guest CART and User Cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {

        return res.status(400).json({ message: "Guest Cart is empty." });
      }
      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color,
          );
          if (productIndex > -1) {
            // if the item present in the user cart , update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // otherwise add the guestItem to the cart
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        await userCart.save();
        // remove the guest cart after merging
        try {
          await findOneAndDelete({ guestId });
        } catch (err) {
          console.error("Error deleting the guestcat:", err);
        }
        res.status(200).json(userCart);

      } else {
        // if the user had no existing cart assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // if the guest cart is already merge, return userCart
        res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
