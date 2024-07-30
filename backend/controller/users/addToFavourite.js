const FavouriteModel = require("../../models/Favourite");

async function addToFavourite(req, resp) {
  try {
    const userId = req.userId;
    const { productId, variantId } = req.body;

    const productAlreadyAdded = await FavouriteModel.findOne({
      productId: productId,
      variantId: variantId,
      userId: userId
    });

    if (productAlreadyAdded) {
      const removeProduct = await FavouriteModel.deleteOne({
        variantId: variantId,
        userId: userId
      });
      resp.status(200).json({
        message: "Removed from favourite",
        data: removeProduct,
        success: true,
        error: false,
      });
    } else {
      const payload = {
        productId: productId,
        variantId: variantId,
        userId: userId,
      };
      const addProductToFavourite = new FavouriteModel(payload);
      const saveProduct = await addProductToFavourite.save();
      resp.status(200).json({
        message: "Added to Favourite",
        data: saveProduct,
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

module.exports = addToFavourite;
