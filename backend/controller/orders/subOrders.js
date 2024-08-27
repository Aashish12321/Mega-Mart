const Suborder = require("../../models/SubOrder");

async function subOrders(req, resp) {
  try {
    const userId = req.userId;
    const { orderId } = req.params;
    const suborders = await Suborder.find({ mainOrder: orderId }).populate("seller", "name");
    
    if (suborders) {
      resp.status(201).json({
        message: "Suborders of a mainorder fetched successfully",
        data: suborders,
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

module.exports = subOrders;
