const User = require("../../models/User");

async function updateUserRole(req, resp) {
  try {
    const sessionUser = req.userId;

    const { id, name, email, role } = req.body;
    // console.log(id, name, email, role );
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await User.findById(sessionUser);
    if (user.role === "ADMIN") {
      const update = await User.findByIdAndUpdate(id, payload).select(
        "_id name email role createdAt"
      );
      resp.status(200).json({
        message: "User updated!",
        data: update,
        success: true,
        error: false,
      });
    } else {
      throw new Error("You do not have permission to update the user");
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserRole;
