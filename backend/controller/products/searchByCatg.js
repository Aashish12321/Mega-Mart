const Product = require("../../models/Product");

async function searchByCatg(req, resp) {
  try {
    const { product } = req.params;
    let results = [];
    if (product) {
      results = await Product.find({
        $or: [{ products: { $regex: product, $options: "i" } }],
      });
    }

    resp.status(200).json({
      message: "Categorywise products fetched successfully",
      data: results,
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

module.exports = searchByCatg;
