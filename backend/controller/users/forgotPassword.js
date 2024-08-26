const User = require("../../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

async function forgotPassword(req, resp) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with this email not found");
    }

    // Generating recovery code
    const recoveryCode = crypto.randomBytes(20).toString("hex");
    user.passwordRecoveryCode = recoveryCode;
    user.recoveryCodeExpiry = Date.now() + 3600000; // Code valid for 1 hour
    await user.save();

    const passwordResetUrl = `${process.env.FRONTEND_URL}/reset-password?code=${recoveryCode}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE, // true for 465, false for other ports
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Recovery",
      html: `
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password. Click the link below to reset your password:</p>
            <p>P.S. The url will be expire in 1 hour.</p>
            <a href="${passwordResetUrl}">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
      text: "This is a test email using Nodemailer and Google App Passwords.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
        resp.status(200).json({
          message: "Password reset code sent! Please check your email",
          success: true,
          error: false,
        });
      }
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = forgotPassword;
