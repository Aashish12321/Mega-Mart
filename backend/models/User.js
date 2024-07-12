const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
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

const User = mongoose.model("user", UserSchema);

module.exports = User;
