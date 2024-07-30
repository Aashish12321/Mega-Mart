const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

async function userLogin(req, resp) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide Email");
    }
    if (!password) {
      throw new Error("Please provide Password");
    }

    const user = await User.findOne({ email });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const tokenData = {
          _id: user._id,
          email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
          expiresIn: '10h',
        });

        resp.status(200).json({
          message: "User Login successful",
          data: token,
          error: false,
          success: true,
        });
      } else {
        throw new Error("Wrong password, Please try again");
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogin;
