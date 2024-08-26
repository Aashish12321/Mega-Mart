const mongoose = require("mongoose");

const SuborderSchema = new mongoose.Schema(
  {
    mainOrder: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: { type: String, required: true },
    payment: {
      method: { type: String, required: true },
      id: { type: String },
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
    status: {
      type: String,
      required: true,
      enum: ["Processing", "Shipped"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const Suborder = mongoose.model("Suborder", SuborderSchema);

module.exports = Suborder;
