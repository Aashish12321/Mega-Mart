const mongoose = require("mongoose");
const Order = require("../../models/Order");
const User = require("../../models/User");

async function adminViewOrder(req, resp) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    let { orderId } = req.params;
    orderId = new mongoose.Types.ObjectId(`${orderId}`);

    const order = await Order.findById(orderId);

    if (user?.role === "VENDOR") {
        order.seller = order?.seller[userId];
    }
    // console.log(orders);

    if (order) {
      resp.status(201).json({
        message: "Vendor specific order details fetched successfully",
        data: order,
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

module.exports = adminViewOrder;
