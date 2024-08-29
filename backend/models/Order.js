const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [],
    address: { type: String, required: true },
    distance: { type: Number, required: true },
    payment: {
      method: { type: String, required: true },
      id: { type: String }, // Payment gateway transaction ID
      isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paidAt: {
        type: Date,
      },
    },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    coupon: { type: String },
    couponDiscount: { type: Number, default: 0 },
    totalWeight: { type: Number, default: 0 },
    shippingCharge: { type: Number, required: true },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
