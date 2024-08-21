const Order = require("../../models/Order");

async function viewAllOrders(req, resp) {
  try {
    const userId = req.userId;
    const orders = await Order.find({user: userId}).sort({createdAt: -1});
    
    if (orders) {
      resp.status(201).json({
        message: "All Orders fetched successfully",
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

module.exports = viewAllOrders;
