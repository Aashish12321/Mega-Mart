const bcrypt = require("bcrypt");
const User = require("../../models/User");

async function userSignUp(req, resp) {
  try {
    const { user } = req.body;

    if (!user?.name) {
      throw new Error("Please provide Username");
    }
    if (!user?.email) {
      throw new Error("Please provide Email");
    }
    if (!user?.mobileNumber) {
      throw new Error("Please provide Mobile Number");
    }
    if (!user?.password) {
      throw new Error("Please provide Password");
    }

    const checkUserEmail = await User.findOne({ email: user?.email });
    if (checkUserEmail) {
      throw new Error("User already exists with this email");
    }
    const checkUserNumber = await User.findOne({ mobileNumber: user?.mobileNumber });
    if (checkUserNumber) {
      throw new Error("User already exists with this Mobile Number");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(user?.password, salt);

    if (!hashedPassword) {
      throw new Error("Something goes wrong");
    }

    const payload = {
      ...user,
      password: hashedPassword,
    };
    let userData = new User(payload);
    const saveUser = await userData.save();

    resp.status(201).json({
      data: saveUser,
      error: false,
      success: true,
      message: "Registered Successfully ! Please login here",
    });
  } catch (err) {
    resp.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUp;
