const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/userSignup");
const userLoginController = require('../controller/userLogin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken')

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);
router.get("/user-details", authToken, userDetailsController)

module.exports = router;

