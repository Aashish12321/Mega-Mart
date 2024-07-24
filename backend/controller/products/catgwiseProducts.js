const Product = require("../../models/Product");

async function catgwiseProducts(req, resp) {
  try {
    const category = req.body.category;
    const products = await Product.find({products: category}).sort({updatedAt: -1});

    resp.status(201).json({
      message: "Products fetched successfully",
      data: products,
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
