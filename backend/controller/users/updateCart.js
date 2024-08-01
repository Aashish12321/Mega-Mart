const AddToCartModel = require("../../models/AddToCart");
// const Product = require("../../models/Product");

async function updateCart(req, resp) {
  try {
    const userId = req.userId;
    const { variantId, quantity } = req.body;

    // console.log(variantId, quantity);

    const newQuantity = quantity < 1 ? 1 : quantity;
    const changeQuantity = await AddToCartModel.updateOne(
      { userId: userId, variantId: variantId },
      { $set: { quantity: newQuantity } }
    );

    if (changeQuantity) {
      resp.status(200).json({
        message: "Quantity updated in cart",
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
