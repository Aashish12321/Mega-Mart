const Coupon = require("../../models/Coupon");
const Cart = require("../../models/Cart");

async function checkCoupon(req, resp) {
  try {
    const userId = req.userId;
    const { couponCode, products } = req.body;
    const currentDate = new Date();

    const user = await Cart.findOne({ userId: userId }); // replace cart by order model.
    const coupon = await Coupon.findOne({ code: couponCode });

    // products?.forEach((product) => {
    //   product[`${coupon?.applicableBy}`] === coupon?.applicableProducts;
    // });

    const isCouponValid = products.some(
      (product) =>
        product[`${coupon?.applicableBy}`] === coupon?.applicableProducts
    );

    if (coupon) {
      if (coupon?.isActive && currentDate < coupon?.validUntil) {
        if (user) {
          if (isCouponValid) {
            resp.status(200).json({
              message: "Coupon applied success",
              data: {
                discount: coupon?.discount,
                discountType: coupon?.discountType
              },
              success: true,
              error: false,
            });
          } else{
            throw new Error("Invalid coupon");
          }
        } else {
          throw new Error("Coupon already used");
        }
      } else {
        throw new Error("Coupon expired");
      }
    } else {
      throw new Error("Invalid Coupon code");
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = checkCoupon;
