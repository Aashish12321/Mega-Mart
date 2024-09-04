const Review = require("../../models/Review");

async function readReviews(req, resp) {
  try {
    const { productId } = req.body;
    const reviews = await Review.find({ productId: productId })
      .sort({ rating: -1 })
      .populate("userId", "name profilePic")
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
    reviews.forEach((review) => (starCounts[review?.rating] += 1));

    const getMaxStarRatingCount = () => {
      for (let i = 1; i <= 5; i++) {
        if (starCounts[i] > maxCount) {
          maxCount = starCounts[i];
        }
      }
      return maxCount;
    };
    let maxCount = -1;
    const maxStarRatingCount = getMaxStarRatingCount();

    // filter out review with no comments
    const filteredReviews = reviews.filter((review) => review?.comment);

    if (reviews.length === 0) {
      resp.status(200).json({
        message: "This product has no reviews till now",
        data: {
          reviews: reviews,
          starCounts: starCounts,
          maxStarRatingCount: maxStarRatingCount,
        },
        success: true,
        error: false,
      });
    } else {
      resp.status(200).json({
        message: "Product reviews fetched successfully",
        data: {
          reviews: filteredReviews,
          starCounts: starCounts,
          maxStarRatingCount: maxStarRatingCount,
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
