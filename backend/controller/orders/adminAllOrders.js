const Order = require("../../models/Order");
const Suborder = require("../../models/SubOrder");
const User = require("../../models/User");

async function adminAllOrders(req, resp) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    let orders = [];
    if (user?.role === "VENDOR") {
      orders = await Suborder.find({seller: userId});
    }
    if (user?.role === "ADMIN") {
      orders = await Order.find().sort({ createdAt: -1 });
    }
    // console.log(orders);

    if (orders) {
      resp.status(201).json({
        message: "Vendor specific orders fetched successfully",
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

module.exports = adminAllOrders;
