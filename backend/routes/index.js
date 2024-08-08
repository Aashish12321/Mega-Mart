const express = require("express");

const router = express.Router();

const userSignUp = require("../controller/users/userSignup");
const userLogin = require("../controller/users/userLogin");
const userDetails = require("../controller/users/userDetails");
const authToken = require("../middleware/authToken");
const allUsers = require("../controller/users/allUsers");
const updateUser = require("../controller/users/updateUser");
const searchUser = require("../controller/users/searchUser");
const uploadProduct = require("../controller/products/uploadProduct");
const getProduct = require("../controller/products/getProduct");
const updateProduct = require("../controller/products/updateProduct");
const getCategories = require("../controller/products/getCategories");
const addCategory = require("../controller/products/addCategory");
const catgwiseProducts = require("../controller/products/catgwiseProducts");
const productDetails = require("../controller/products/productDetails");
const addToCart = require("../controller/users/addToCart");
const viewCart = require("../controller/users/viewCart");
const addToFavourite = require("../controller/users/addToFavourite");
const viewFavourite = require("../controller/users/viewFavourite");
const getCartProducts = require("../controller/users/getCartProducts");
const updateCart = require("../controller/users/updateCart");
const getFavouriteProducts = require("../controller/users/getFavouriteProducts");
const addReview = require("../controller/users/addReview");
const readReviews = require("../controller/users/readReviews");
const replyToReview = require("../controller/users/replyToReview");
const productRating = require("../controller/products/productRating");
const deleteMedia = require("../controller/cloudinary/deleteMedia");


router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/user-details", authToken, userDetails);
router.get("/get-products", getProduct);
router.post("/productdetails", productDetails);
router.get("/get-categories", getCategories);
router.post("/catgwiseproducts", catgwiseProducts);
router.post("/add-to-cart", authToken, addToCart);
router.get("/view-cart", authToken, viewCart);
router.post("/update-cart", authToken, updateCart);
router.get("/cart-products-details", authToken, getCartProducts);

router.post("/add-to-favourite", authToken, addToFavourite);
router.get("/view-favourite", authToken, viewFavourite);
router.get("/favourite-products-details", authToken, getFavouriteProducts);
router.post("/add-new-review", authToken, addReview);
router.post("/read-reviews", readReviews);
router.post("/reply-to-review", authToken, replyToReview);
router.post("/product-rating",  productRating);

// cloudinary
router.post("/delete-media", authToken, deleteMedia);


// admin
router.get("/all-users", allUsers);
router.post("/update-user", authToken, updateUser);
router.get("/search-user/:key", authToken, searchUser);
router.post("/upload-product", authToken, uploadProduct);
router.post("/update-product", authToken, updateProduct);
router.post("/add-category", authToken, addCategory);

module.exports = router;
