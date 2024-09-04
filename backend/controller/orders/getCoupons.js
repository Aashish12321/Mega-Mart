const Coupon = require("../../models/Coupon");
const Order = require("../../models/Order");

async function getCoupons(req, resp) {
  try {
    let userId = req.userId;
    const coupons = await Coupon.find();
    
    const usedCoupons = await Order.find({ user: userId }).distinct("coupon");
    const unusedCoupons = coupons.filter(
      (coupon) => !usedCoupons.includes(coupon.code)
    );
    
    resp.status(200).json({
      message: "Customer Coupons fetched successfully",
      data: unusedCoupons,
      success: true,
      error: false,
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = getCoupons;
