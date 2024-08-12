const Coupon = require("../../models/Coupon");

async function createCoupon(req, resp) {
  try {
    const {
      code,
      discount,
      discountType,
      validUntil,
      minimumOrderValue,
      applicableProducts,
      createdBy,
      vendorId,
    } = req.body;

    let newCoupon = new Coupon({
      code,
      discount,
      discountType,
      validUntil,
      minimumOrderValue,
      applicableProducts,
      createdBy,
      vendorId,
    });

    newCoupon = await newCoupon.save();
    if (newCoupon) {
      resp.status(201).json({
        message: "Coupon created successfully",
        data: newCoupon,
        success: true,
        error: false
      });
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = createCoupon;
