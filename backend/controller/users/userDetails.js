const User = require("../../models/User");

async function userDetails(req, resp){
    try {
        const userId = req.userId
        const user = await User.findById(userId).select('-password -createdAt -updatedAt -__v');
        if(user){
            resp.status(200).json({
                message: "Login successful",
                data: user,
                error: false,
                success: true
            })
        }
        else{
            throw new Error('Error fetching user details');
        }
        
    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userDetails;
