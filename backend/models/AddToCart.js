const mongoose = require("mongoose");

const AddToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: string,
      ref: "Product",
      required: true,
    },
    variantId: { type: string, required: true },
    quantity: { type: string, required: true },
    userId: { type: string, ref: "User", required: true },
  }, 
  {
    timestamps: true,
  }
);

const AddToCartModel = mongoose.model("Cart", AddToCartSchema);

module.exports = AddToCartModel;
