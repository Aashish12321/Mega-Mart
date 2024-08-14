const Review = require("../../models/Review");

async function replyToReview(req, resp) {
  try {
    const sellerId = req.userId;
    const { reviewId, reply } = req.body;
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error("Review not found");
    } else {
      let updateReview = review?.replies?.push({ sellerId, reply });
      updateReview = await review.save();
      resp.status(200).json({
        message: "replied successfully",
        data: updateReview?.replies,
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

module.exports = replyToReview;
