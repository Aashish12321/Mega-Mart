const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/users/userSignup");
const userLoginController = require('../controller/users/userLogin');
const userDetailsController = require('../controller/users/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/users/userLogout');
const allUsersController = require('../controller/users/allUsers');
const updateUser = require('../controller/users/updateUser');
const searchUser = require('../controller/users/searchUser');
const uploadProduct = require('../controller/products/uploadProduct');
const getProduct = require('../controller/products/getProduct');
const updateProduct = require('../controller/products/updateProduct');
const getCategories = require('../controller/products/getCategories');

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);
router.get('/get-products', getProduct);
router.get('/get-categories', getCategories);

// admin 
router.get('/all-users', allUsersController);
router.post('/update-user',authToken, updateUser);
router.get('/search-user/:key', authToken, searchUser);
router.post('/upload-product', authToken, uploadProduct);
router.post('/update-product', authToken, updateProduct);


module.exports = router;

