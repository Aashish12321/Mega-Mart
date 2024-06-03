const User = require("../models/User");

async function userDetailsController(req, resp){
    try {
        const userId = req.userId
        const user = await User.findById(userId);

        resp.status(200).json({
            message: "Login successful",
            data:user,
            error: false,
            success: true
        })
    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController;
