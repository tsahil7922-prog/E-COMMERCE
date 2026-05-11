const mongoose = require("mongoose");
const checkOutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size:String,
    color:String
  },
  { _id: false },
);

const checkOutSchema = new mongoose.Schema(
  {
    user: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      checkOutItem: [checkOutItemSchema],
      shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      isPaid: {
        type: Boolean,

        default: false,
      },
      paidAt: {
        type: Date,
      },
      paymentStatus: {
        type: String,
        default: "pending",
      },
      paymentDetails: {
        type: mongoose.Schema.Types.Mixed, //store payment related to transaction id , paypal response
      },
      isFinalized: {
        type: Boolean,
        default: false,
      },
      finalizedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Checkout", checkOutSchema);
