const Order = require("../../models/Order");
const Suborder = require("../../models/Suborder");
const User = require("../../models/User");

async function allOrders(req, resp) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    let orders = [];
    if (user?.role === "VENDOR") {
      orders = await Suborder.find({seller: userId}).sort({ createdAt: -1 });
    }
    if (user?.role === "ADMIN") {
      orders = await Order.find().sort({ createdAt: -1 });
    }

    if (orders) {
      resp.status(201).json({
        message: "Admin/Vendor specific orders fetched successfully",
        data: orders,
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

module.exports = allOrders;
