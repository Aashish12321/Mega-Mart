const User = require("../models/User");

async function allUsersController(req, resp){
    try {
        const userId =  req.userId;
        const user = await User.find();

        resp.status(200).json({
            message: "All users fetched successful",
            data: user,
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

module.exports = allUsersController;
