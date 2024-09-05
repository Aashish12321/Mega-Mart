const Product = require("../../models/Product");
const Review = require("../../models/Review");

async function getAllProducts(req, resp) {
  try {
    const products = await Product.find().sort({ updatedAt: -1 });

    // const dropRating = async (productId) => {
    //   let updatedProduct = await Product.findByIdAndUpdate(
    //     productId, // The product's unique identifier (e.g., _id)
    //     { $unset: { rating: "" } }, // $unset operator to remove the attribute
    //     { new: true } // Option to return the updated document
    //   );
    // };

    // update ratings of product
    // products?.forEach((product) => {
    //   updateProductRating(product?._id);
    // });

    resp.status(201).json({
      message: "All products fetched successfully",
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

module.exports = getAllProducts;
