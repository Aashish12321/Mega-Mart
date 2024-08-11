const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

async function getCartProducts(req, resp) {
  try {
    const userId = req.userId;
    const cartProducts = await Cart.find({ userId: userId });
    let allProductsInCart = [];
    if (cartProducts.length > 0) {
      allProductsInCart = await Promise.all(
        cartProducts.map(async (cartProduct) => {
          let product = await Product.findById(cartProduct?.productId).select(
            "-timestamps -updatedAt -customerReviews -price.cost -ratings -__v"
          );
          let variant = product?.variants?.find((variant) =>
            variant?._id.equals(cartProduct?.variantId)
          );
          let spec = variant?.specs?.find((spec) =>
            spec?._id.equals(cartProduct?.specId)
          );
          variant["specs"] = spec;
          product["variants"] = variant;
          // console.log("v", variant);
          // console.log("s", spec);
          return product;
        })
      );
    }
    // console.log("all products in cart", allProductsInCart);
    if (allProductsInCart.length > 0) {
      resp.status(200).json({
        message: "Cart products fetched successfully",
        data: allProductsInCart,
        success: true,
        error: false,
      });
    } else {
      resp.status(200).json({
        message: "Cart is empty",
        data: allProductsInCart,
        success: true,
        error: false,
      });
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = getCartProducts;
