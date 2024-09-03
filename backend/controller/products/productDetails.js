const Product = require("../../models/Product");

async function productDetails(req, resp) {
  try {
    const { pid } = req.body;
    const productDetails = await Product.findById(pid).select(
      "-timestamps -updatedAt -customerReviews -price.cost -ratings -__v"
    );
    resp.status(201).json({
      message: "Product details fetched successfully",
      data: productDetails,
      success: true,
      error: false,
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = productDetails;
