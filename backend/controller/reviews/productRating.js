const Review = require("../../models/Review");
const Product = require("../../models/Product");

async function productRating(req, resp) {
  try {
    const { productId } = req.body;
    const reviews = await Review.find({ productId: productId });

    const totalRating = reviews.reduce(
      (acc, review) => acc + review?.rating,
      0
    );
    let avgRating = totalRating / reviews?.length;
    avgRating = Math.round(avgRating * 10) / 10;
    const filterComment = reviews.filter((review) => review?.comment);

    if (reviews.length === 0) {
      resp.status(200).json({
        message: "This product has no reviews till now",
        data: {
          avgRating: 0,
          ratingCount: 0,
          commentCount: 0,
        },
        success: true,
        error: false,
      });
    } else {
      resp.status(200).json({
        message: "Product reviews fetched successfully",
        data: {
          avgRating: avgRating,
          ratingCount: reviews?.length,
          commentCount: filterComment?.length,
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

module.exports = productRating;
