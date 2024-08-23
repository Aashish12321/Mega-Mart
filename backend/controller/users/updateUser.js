const User = require("../../models/User");

async function updateUser(req, resp) {
  try {
    const userId = req.userId;
    const { updatedUser } = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedUser);

    if (user) {
      resp.status(201).json({
        message: "Information updated",
        data: user,
        success: true,
        error: false,
      });
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
