const Cart = require("../../models/Cart");

async function updateCart(req, resp) {
  try {
    const userId = req.userId;
    const { productId, variantId, specId, quantity } = req.body;

    const changeQuantity = await Cart.findOneAndUpdate(
      { userId: userId, productId: productId, variantId: variantId, specId: specId },
      { $set: { quantity: quantity } },
    );

    if (changeQuantity) {
      resp.status(200).json({
        message: "Quantity updated",
        data: changeQuantity,
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

module.exports = updateCart;
