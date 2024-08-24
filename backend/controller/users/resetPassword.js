const User = require("../../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

async function viewOrder(req, resp) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    // Generating recovery code
    const recoveryCode = crypto.randomBytes(20).toString("hex");
    user.passwordRecoveryCode = recoveryCode;
    user.recoveryCodeExpiry = Date.now() + 3600000; // Code valid for 1 hour
    await user.save();

    const passwordResetUrl = `${process.env.FRONTEND_URL}/reset-password?code=${recoveryCode}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aashishshroff@gmail.com",
        pass: "shopquicklyfrommegamart",
      },
      host: "smtp.gmail.com",
      port: 465, // For secure SMTP
      secure: true, // true for 465, false for other ports
    });

    console.log(transporter);

    const mailOptions = {
      from: "shopquick.megamart@gmail.com",
      to: email,
      subject: "Password Recovery",
      html: `
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password. Click the link below to reset your password:</p>
            <a href="${passwordResetUrl}">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
      text: "This is a test email using Nodemailer and Google App Passwords.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    resp.status(400).json({
      message: "Password reset code sent",
      success: true,
      error: false,
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = viewOrder;
