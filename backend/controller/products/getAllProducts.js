const Product = require("../../models/Product");
const User = require("../../models/User");

async function getAllProducts(req, resp) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    let products = [];
    if (user?.role === "ADMIN") {
      products = await Product.find().sort({ updatedAt: -1 });
    } else {
      products = await Product.find({"seller.id": user?._id }).sort({ updatedAt: -1 });
    }

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

    resp.status(200).json({
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
