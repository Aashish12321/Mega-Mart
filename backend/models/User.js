const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    profilePic: String,
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
