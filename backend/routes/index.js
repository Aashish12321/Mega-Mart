const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/users/userSignup");
const userLoginController = require("../controller/users/userLogin");
const userDetailsController = require("../controller/users/userDetails");
const authToken = require("../middleware/authToken");
const allUsersController = require("../controller/users/allUsers");
const updateUser = require("../controller/users/updateUser");
const searchUser = require("../controller/users/searchUser");
const uploadProduct = require("../controller/products/uploadProduct");
const getProduct = require("../controller/products/getProduct");
const updateProduct = require("../controller/products/updateProduct");
const getCategories = require("../controller/products/getCategories");
const addCategory = require("../controller/products/addCategory");
const catgwiseProducts = require("../controller/products/catgwiseProducts");
const productDetails = require("../controller/products/productDetails");

router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/get-products", getProduct);
router.post("/productdetails", productDetails);
router.get("/get-categories", getCategories);
router.post("/catgwiseproducts", catgwiseProducts);

// admin
router.get("/all-users", allUsersController);
router.post("/update-user", authToken, updateUser);
router.get("/search-user/:key", authToken, searchUser);
router.post("/upload-product", authToken, uploadProduct);
router.post("/update-product", authToken, updateProduct);
router.post("/add-category", authToken, addCategory);

module.exports = router;
