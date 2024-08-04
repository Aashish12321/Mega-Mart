const Cart = require("../../models/Cart");

async function addToCart(req, resp) {
  try {
    const userId = req.userId;
    const { productId, variantId, specId, quantity } = req.body;

    const productAlreadyAdded = await Cart.findOne({
      productId: productId,
      variantId: variantId,
      specId: specId,
      userId: userId,
    });

    if (productAlreadyAdded) {
      const removeProduct = await Cart.deleteOne({
        variantId: variantId,
        specId: specId,
        userId: userId,
      });
      resp.status(200).json({
        message: "Removed from Cart",
        data: removeProduct,
        success: true,
        error: false,
      });
    } else {
      const payload = {
        productId: productId,
        variantId: variantId,
        specId: specId,
        quantity: quantity,
        userId: userId,
      };
      const addProductToCart = new Cart(payload);
      const saveProduct = await addProductToCart.save();
      resp.status(200).json({
        message: "Added to Cart",
        data: saveProduct,
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

module.exports = addToCart;
