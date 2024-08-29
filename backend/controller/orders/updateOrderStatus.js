const Order = require("../../models/Order");

async function updateOrderStatus(req, resp) {
  try {
    const { orderId, status, isPaid } = req.body;
    let paidStatus = isPaid;
    if (!isPaid){
      if (status === "Delivered"){
        paidStatus = true;
      }
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: status, payment: { isPaid: paidStatus } } },
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
