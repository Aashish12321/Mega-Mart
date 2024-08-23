const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    profilePic: String,
    name: { type: String, required: true },
    mobileNumber: { type: String, unique: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
    dob: { type: String },
    gender: { type: String }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
