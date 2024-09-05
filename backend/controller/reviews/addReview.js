const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Review = require("../../models/Review");

async function addReview(req, resp) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const order = await Order.exists({
      user: userId,
      "products._id": productId,
    });

    let payload = {
      ...req.body,
      userId: userId,
      verified: !!order,
    };

    let newReview = new Review(payload);
    newReview = await newReview.save();

    // update ratings of product
    const reviews = await Review.find({ productId: productId });
    const totalRating = reviews?.reduce(
      (acc, review) => acc + review?.rating,
      0
    );
    let averageRating = totalRating / reviews?.length;
    averageRating = Math.round(averageRating * 10) / 10;
    const filterComment = reviews?.filter((review) => review?.comment);

    let product = await Product.findById(productId);
    product.ratings.avgRating = averageRating || 0;
    product.ratings.ratingCount = reviews?.length;
    product.ratings.commentCount = filterComment?.length;
    await product.save();

    resp.status(200).json({
      message: "Thanks for your response",
      data: newReview,
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

module.exports = addReview;
