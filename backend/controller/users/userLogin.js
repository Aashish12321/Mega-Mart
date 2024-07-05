const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require('jsonwebtoken');

async function userLoginController (req, resp){
    try {
        const {email, password} = req.body;

        if (!email){
            throw new Error('Please provide Email')
        }
        if (!password){
            throw new Error('Please provide Password')
        }

        const user = await User.findOne({email});
        if(user){
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (checkPassword){
                const tokenData = {
                    _id: user._id,
                    email: user.email
                }
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60*60*8});
                const tokenOption = {
                    httpOnly: true,
                    sameSite: 'Lax',
                    secure: true
                }

                resp.cookie('token', token, tokenOption).status(200).json({
                    message: "User LoggedIn successfully",
                    data: token,
                    error: false,
                    success: true
                })

                
            }
            else{
                throw new Error('Wrong password, Please try again');
            }
        }
        else{
            throw new Error('User do not exists');
        }


    } catch (err) {
        resp.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = userLoginController;
