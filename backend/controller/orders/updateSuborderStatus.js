const Suborder = require("../../models/SubOrder");

async function updateSuborderStatus(req, resp) {
  try {
    const { suborderId, status } = req.body;
    
    const suborder = await Suborder.findByIdAndUpdate(
      suborderId,
      { $set: { status: status } },
      { new: true }
    );

    if (suborder) {
      resp.status(200).json({
        message: "Suborder Status updated",
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

module.exports = updateSuborderStatus;
