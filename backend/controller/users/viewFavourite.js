const Favourite = require("../../models/Favourite");
async function viewFavourite(req, resp) {
  try {
    const userId = req.userId;
    const favouriteProducts = await Favourite.find({ userId: userId });

    if (favouriteProducts) {
      resp.status(200).json({
        message: "Favourite products fetched success",
        data: {
          favouriteProducts: favouriteProducts,
          count: favouriteProducts.length,
        },
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

module.exports = viewFavourite;
