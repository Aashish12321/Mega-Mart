const Order = require("../../models/Order");

async function updateOrderStatus(req, resp) {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: status } },
      { new: true }
    );

    if (order) {
      resp.status(201).json({
        message: "Order Status updated",
        success: true,
        error: false,
      });
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = updateOrderStatus;
