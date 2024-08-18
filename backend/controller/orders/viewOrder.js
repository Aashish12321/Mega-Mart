const Order = require("../../models/Order");

async function viewOrder(req, resp) {
  try {
    const userId = req.userId;
    const order = await Order.findOne({user: userId});
    
    if (order) {
      resp.status(201).json({
        message: "Order fetched successfully",
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

module.exports = viewOrder;
