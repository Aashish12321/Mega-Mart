const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // profilePic: String,
    username: String,
    email : {
        type: String,
        unique: true,
        required: true
    },
    password: String
})


const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
