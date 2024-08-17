const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      size : { type: String },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  address: { type: String, required: true },
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
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
