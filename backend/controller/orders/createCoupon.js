const Coupon = require("../../models/Coupon");

async function createCoupon(req, resp) {
  try {
    const userId = req.userId;
    const {
      code,
      discount,
      discountUpto,
      validUntil,
      minimumOrderValue,
      applicableBrand,
      applicableProducts,
      applicableProductId,
      applicableUsers,
    } = req.body;

    const isCouponExist = await Coupon.findOne({code: code});
    if (isCouponExist){
      throw new Error("Coupon code already exists. Please choose another code.");
    }

    let newCoupon = new Coupon({
      code,
      discount,
      discountUpto,
      validUntil,
      minimumOrderValue,
      applicableBrand,
      applicableProducts,
      applicableProductId,
      applicableUsers,
      createdBy: userId,
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
