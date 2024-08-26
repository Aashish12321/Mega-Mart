const User = require("../../models/User");
const bcrypt = require("bcrypt");

async function resetPassword(req, resp) {
  try {
    const { recoveryCode, newPassword } = req.body;

    const user = await User.findOne({
      passwordRecoveryCode: recoveryCode,
      recoveryCodeExpiry: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Code expired");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    if (!hashedPassword) {
      throw new Error("Something goes wrong");
    }

    user.password = hashedPassword;
    user.passwordRecoveryCode = undefined;
    user.recoveryCodeExpiry = undefined;
    const updateUserPassword = await user.save();
    if (updateUserPassword){
      resp.status(200).json({
        message: "Password reset successful ! Please login",
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

module.exports = resetPassword;
