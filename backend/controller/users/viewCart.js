const Cart = require("../../models/Cart");

async function viewCart(req, resp) {
  try {
    const userId = req.userId;
    const cartProducts = await Cart.find({ userId: userId });

    if (cartProducts) {
      resp.status(200).json({
        message: "Cart products fetched success",
        data: {
          cartProducts: cartProducts,
          count: cartProducts.length,
        },
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

module.exports = viewCart;
