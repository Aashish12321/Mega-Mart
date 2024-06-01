const bcrypt = require('bcrypt');
const User = require('../models/User')

async function userSignUpController (req, resp){
    try {
        const {username, email, password} = req.body;

        if (!username){
            throw new Error('Please provide Username')
        }
        if (!email){
            throw new Error('Please provide Email')
        }
        if (!password){
            throw new Error('Please provide Password')
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        if(!hashedPassword){
            throw new Error('Something goes wrong');
        }

        const payload = {
            ...req.body,
            password: hashedPassword
        }
        let userData = new User(payload);
        const saveUser = await userData.save();

        // console.log(saveUser);

        resp.status(201).json({
            data: saveUser,
            error: false,
            success: true,
            message: 'User created successfully!'
        })

    } catch (err) {
        resp.json({
            message: err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController;
