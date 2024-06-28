const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/userSignup");
const userLoginController = require('../controller/userLogin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsersController = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');
const searchUser = require('../controller/searchUser');
const uploadProduct = require('../controller/uploadProduct');
const getProduct = require('../controller/getProduct');
const updateProduct = require('../controller/updateProduct');

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);
router.get("/user-details", authToken, userDetailsController)
router.get("/logout", userLogout);
router.get('/get-products', getProduct);

// admin 
router.get('/all-users', allUsersController);
router.post('/update-user',authToken, updateUser);
router.get('/search-user/:key', authToken, searchUser);
router.post('/upload-product', authToken, uploadProduct);
router.post('/update-product', authToken, updateProduct);


module.exports = router;

