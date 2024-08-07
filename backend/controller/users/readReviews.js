const Review = require("../../models/Review");

async function readReviews(req, resp) {
  try {
    const { productId } = req.body;
    const reviews = await Review.find({ productId: productId })
      .populate("userId", "name")
      .populate({
        path: "replies",
        populate: { path: "sellerId", select: "name" },
      });

    const starCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    reviews.forEach((review) => starCounts[review?.rating] += 1 );

    if (reviews.length === 0) {
      resp.status(200).json({
        message: "This product has no reviews till now",
        data: reviews,
        success: true,
        error: false,
      });
    } else {
      resp.status(200).json({
        message: "Product reviews fetched successfully",
        data: {
          reviews: reviews,
          starCounts: starCounts
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

module.exports = readReviews;
