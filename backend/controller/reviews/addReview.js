const Order = require("../../models/Order");
const Review = require("../../models/Review");

async function addReview(req, resp) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const order = await Order.exists({ user: userId, "products._id": productId });

    let payload = {
      ...req.body,
      userId: userId,
      verified: !!order,
    };

    let newReview = new Review(payload);
    newReview = await newReview.save();

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
