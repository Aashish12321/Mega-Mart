const Review = require("../../models/Review");

async function fetchReviews(req, resp) {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    const reviews = await Review.find({ productId: productId })
      .populate("userId", "name")
      .populate("replies.sellerId", "name");

    resp.status(200).json({
      message: "Product reviews fetched successfully",
      data: reviews,
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

module.exports = fetchReviews;
