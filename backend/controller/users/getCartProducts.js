const Product = require("../../models/Product");

async function getCartProducts(req, resp) {
  try {
    const cartProducts = req.body;
    let allProductsInCart = [];
    if (cartProducts.length > 0) {
      allProductsInCart = await Promise.all(
        cartProducts.map(async (product, _) => {
          let productDetail = await Product.findById(product?.productId);
          return productDetail;
        })
      );
    }
    // console.log("all products in cart", allProductsInCart);
    if (allProductsInCart.length > 0) {
      resp.status(200).json({
        message: "All Cart products details fetched success",
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
