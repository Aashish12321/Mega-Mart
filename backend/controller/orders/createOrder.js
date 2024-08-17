const Order = require("../../models/Order");

async function createOrder(req, resp) {
  try {
    const userId = req.userId;
    const { order } = req.body;

    let newOrder = new Order({
      userId,
      ...order,
    });

    newOrder = await newOrder.save();
    if (newOrder) {
      resp.status(201).json({
        message: "Order created successfully",
        data: newOrder,
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

module.exports = createOrder;
