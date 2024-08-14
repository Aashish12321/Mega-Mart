const Product = require("../../models/Product");

async function catgwiseProducts(req, resp) {
  try {
    const { products } = req.body;
    const catwiseProducts = await Product.find({ products: products })
      .select(
        "-timestamps -updatedAt -customerReviews -price.cost -ratings -__v"
      )
      .sort({ updatedAt: -1 });

    resp.status(201).json({
      message: "Products fetched successfully",
      data: catwiseProducts,
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

module.exports = catgwiseProducts;
