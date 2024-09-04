const mongoose = require("mongoose");
const Suborder = require("../../models/Suborder");

async function suborderDetails(req, resp) {
  try {
    let { suborderId } = req.params;
    suborderId = new mongoose.Types.ObjectId(`${suborderId}`);

    let suborder = await Suborder.findById(suborderId);

    if (suborderId) {
      resp.status(201).json({
        message: "suborder details fetched successfully",
        data: suborder,
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

module.exports = suborderDetails;
  