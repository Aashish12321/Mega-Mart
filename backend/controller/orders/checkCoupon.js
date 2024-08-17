const Coupon = require("../../models/Coupon");
const Cart = require("../../models/Cart");

async function checkCoupon(req, resp) {
  try {
    const userId = req.userId;
    const { couponCode, products, cartProducts } = req.body;
    const currentDate = new Date();

    const user = await Cart.findOne({ userId: userId }); // replace cart by order model.
    const coupon = await Coupon.findOne({ code: couponCode });
    let calculatedDiscount = 0;
    let isCouponValid = false;

    if (coupon) {
      if (coupon?.isActive && currentDate < coupon?.validUntil) {
        if (user) {
          if (coupon?.applicableProductId) {
            isCouponValid = products.some(
              (product) =>
                product?.brand === coupon?.applicableBrand &&
                product?.products === coupon?.applicableProducts &&
                product?._id.equals(coupon?.applicableProductId)
            );
          } else {
            isCouponValid = products.some(
              (product) =>
                product?.brand === coupon?.applicableBrand &&
                product?.products === coupon?.applicableProducts
            );
          }
        } else {
          throw new Error("Coupon already used");
        }
      } else {
        throw new Error("Coupon expired");
      }
    } else {
      throw new Error("Coupon code do not exist");
    }

    if (isCouponValid) {

      let totalOrderValue = products?.reduce(
        (acc, product) => acc + product?.price?.sell * product?.quantity,
        0
      );

      if (totalOrderValue >= coupon?.minimumOrderValue) {
        const productsMatchingCoupon = products?.filter(
          (product) =>
            product?.brand === coupon?.applicableBrand &&
            product?.products === coupon?.applicableProducts
        );
        const totalValueOfProductsMatchingCoupon =
          productsMatchingCoupon?.reduce(
            (acc, product) => acc + product?.price?.sell * product?.quantity,
            0
          );
        if (
          (totalValueOfProductsMatchingCoupon * coupon?.discount) / 100 >=
          coupon?.discountUpto
        ) {
          calculatedDiscount = coupon?.discountUpto;
        } else {
          calculatedDiscount =
            (totalValueOfProductsMatchingCoupon * coupon?.discount) / 100;
        }
      } else {
        throw new Error(
          `Minimum order value doesn't meet. Please add more items too enjoy perks of shopping with us.`
        );
      }
    } else {
      throw new Error("Coupon code not valid for selected products");
    }

    resp.status(200).json({
      message: "Congrats! Coupon applied successfully",
      data: {
        discountPercent: coupon?.discount,
        discountAmount: parseInt(calculatedDiscount),
      },
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

module.exports = checkCoupon;
