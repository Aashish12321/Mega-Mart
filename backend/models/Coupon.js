const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    discount: { type: Number, required: true },
    discountUpto: { type: Number },
    validUntil: { type: Date, required: true },
    minimumOrderValue: { type: Number, default: 0 },
    applicableBrand: { type: String, required: true },
    applicableProducts: { type: String, required: true },
    applicableProductId: { type: String },
    applicableUsers: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
