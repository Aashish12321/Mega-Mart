const Favourite = require("../../models/Favourite");
const Product = require("../../models/Product");

async function getFavouriteProducts(req, resp) {
  try {
    const userId = req.userId;
    const favouriteProducts = await Favourite.find({ userId: userId });
    let allProductsInFavourite = [];
    if (favouriteProducts.length > 0) {
      allProductsInFavourite = await Promise.all(
        favouriteProducts.map(async (favouriteProduct) => {
          let product = await Product.findById(
            favouriteProduct?.productId
          ).select(
            "-timestamps -updatedAt -price.cost -__v"
          );
          let variant = product?.variants?.find((variant) =>
            variant?._id.equals(favouriteProduct?.variantId)
          );
          product["variants"] = variant;
          return product;
        })
      );
    }

    if (allProductsInFavourite.length > 0) {
      resp.status(200).json({
        message: "Favourite products fetched successfully",
        data: allProductsInFavourite,
        success: true,
        error: false,
      });
    } else {
      resp.status(200).json({
        message: "Favourite is empty",
        data: allProductsInFavourite,
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

module.exports = getFavouriteProducts;
