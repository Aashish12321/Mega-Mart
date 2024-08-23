const User = require("../../models/User");

async function updateUserRole(req, resp){
    try {
        const sessionUser = req.userId;

        const { id, name, email, role } = req.body;
        // console.log(id, name, email, role );
        const payload = {
            ...(email && {email: email}),
            ...(name && {name: name}),
            ...(role && {role: role}),
        }

        const user = await User.findById(sessionUser);
        if (user.role === 'ADMIN'){
            const update = await User.findByIdAndUpdate(id, payload);
            // console.log(update);
            resp.json({
                data: update,
                message: "User updated!",
                success: true,
                error: false
            })
        }
        else{
            throw new Error('You do not have permission to update the user');
        }

    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateUserRole;
