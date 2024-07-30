const bcrypt = require('bcrypt');
const User = require('../../models/User')

async function userSignUp(req, resp){
    try {
        const {name, email, password} = req.body;

        if (!name){
            throw new Error('Please provide Username')
        }
        if (!email){
            throw new Error('Please provide Email')
        }
        if (!password){
            throw new Error('Please provide Password')
        }

        const user = await User.findOne({email});
        if (user){
            throw new Error("User already exists with this email");
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        if(!hashedPassword){
            throw new Error('Something goes wrong');
        }

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashedPassword
        }
        let userData = new User(payload);
        const saveUser = await userData.save();

        resp.status(201).json({
            data: saveUser,
            error: false,
            success: true,
            message: 'User created successfully'
        })

    } catch (err) {
        resp.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUp;

