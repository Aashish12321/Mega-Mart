const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    profilePic: String,
    username: String,
    email : {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: String
},{
    timestamps: true
})


const User = mongoose.model('user', UserSchema);

module.exports = User;
