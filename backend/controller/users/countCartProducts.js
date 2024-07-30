const AddToCartModel = require("../../models/AddToCart");

async function countCartProduct(req, resp) {
  try {
    const userId = req.userId;
    const count = await AddToCartModel.countDocuments({ userId: userId });

    if (count) {
      resp.status(200).json({
        message: "Total number of Cart products fetched success",
        data: count,
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

module.exports = countCartProduct;
