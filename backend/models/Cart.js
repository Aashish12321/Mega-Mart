const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },
    variantId: { type: String, required: true },
    specId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    userId: { type: String, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
