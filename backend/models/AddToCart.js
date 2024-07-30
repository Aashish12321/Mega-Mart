const mongoose = require("mongoose");

const AddToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },
    variantId: { type: String, required: true },
    quantity: { type: String, default: 1 },
    userId: { type: String, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const AddToCartModel = mongoose.model("Cart", AddToCartSchema);

module.exports = AddToCartModel;
