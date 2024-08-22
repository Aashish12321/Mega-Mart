const mongoose = require("mongoose");
const Order = require("../../models/Order");

async function viewOrder(req, resp) {
  try {
    const userId = req.userId;
    let { orderId } = req.params;
    orderId = new mongoose.Types.ObjectId(`${orderId}`);

    const order = await Order.findById(orderId);

    if (order?.user.equals(userId)) {
      resp.status(201).json({
        message: "Order fetched successfully",
        data: order,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Order not found");
    }
  } catch (err) {
    resp.status(400).json({
      message: "Order not found",
      success: false,
      error: true,
    });
  }
}

module.exports = viewOrder;
