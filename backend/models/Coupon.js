const mongoose = require("mongoose");

const applicableProductSchema = new mongoose.Schema({
    category: { type: String },
    subCategory: { type: String },
    products: { type: String },
});

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    discount: { type: Number, required: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    validUntil: { type: Date, required: true },
    minimumOrderValue: { type: Number, default: 0 },
    applicableProducts: [applicableProductSchema],
    createdBy: { type: String, enum: ["platform", "vendor"], required: true },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.createdBy === "vendor";
      },
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
