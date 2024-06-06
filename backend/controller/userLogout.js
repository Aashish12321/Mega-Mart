async function userLogout (req, resp){
    try {
        resp.clearCookie('token');

        resp.json({
            message: "User logout successful",
            data: [],
            error: false, 
            success: true
        })
    } catch (err) {
        resp.json({
            message: err.message,
            data: [],
            error: true, 
            success: false
        })
    }
}

module.exports = userLogout;
