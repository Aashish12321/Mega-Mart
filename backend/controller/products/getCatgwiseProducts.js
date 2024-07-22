const Product = require("../../models/Product");

async function getCatgwiseProducts(req, resp) {
  try {
    const category = req.body;
    const Products = await Product.find({ category: category });

    resp.status(201).json({
      message: "Products fetched successfully",
      data: Products,
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

module.exports = getCatgwiseProducts;
