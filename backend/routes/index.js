const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/userSignup");
const userLoginController = require('../controller/userLogin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsersController = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);
router.get("/user-details", authToken, userDetailsController)
router.get("/logout", userLogout);

// admin 
router.get('/all-users',authToken, allUsersController);
router.post('/update-user',authToken, updateUser);

module.exports = router;

