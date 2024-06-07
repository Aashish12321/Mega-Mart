async function allUsers(req, resp){
    try {
        console.log(req.userId);
    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = allUsers;
