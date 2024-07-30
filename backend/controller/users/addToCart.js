const AddToCartModel = require("../../models/AddToCart");

async function addToCart(req, resp) {
  try {
    const userId = req.userId;
    const { productId, variantId, quantity } = req.body;

    const productAlreadyAdded = await AddToCartModel.findOne({
      productId: productId,
      variantId: variantId,
      userId: userId,
    });

    if (productAlreadyAdded) {
      const removeProduct = await AddToCartModel.deleteOne({
        variantId: variantId,
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
        quantity: quantity,
        userId: userId,
      };
      const addProductToCart = new AddToCartModel(payload);
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
