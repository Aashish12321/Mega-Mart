const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/userSignup");
const userLoginController = require('../controller/userLogin');

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);

module.exports = router;

