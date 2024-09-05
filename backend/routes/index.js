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
const getAllProducts = require("../controller/products/getAllProducts");
const updateProduct = require("../controller/products/updateProduct");
const getCategories = require("../controller/categories/getCategories");
const addCategory = require("../controller/categories/addCategory");
const catgwiseProducts = require("../controller/categories/catgwiseProducts");
const productDetails = require("../controller/products/productDetails");
const addToCart = require("../controller/cart/addToCart");
const viewCart = require("../controller/cart/viewCart");
const addToFavourite = require("../controller/favourite/addToFavourite");
const viewFavourite = require("../controller/favourite/viewFavourite");
const getCartProducts = require("../controller/cart/getCartProducts");
const updateCart = require("../controller/cart/updateCart");
const getFavouriteProducts = require("../controller/favourite/getFavouriteProducts");
const addReview = require("../controller/reviews/addReview");
const readReviews = require("../controller/reviews/readReviews");
const replyToReview = require("../controller/reviews/replyToReview");
const deleteMedia = require("../controller/cloudinary/deleteMedia");
const adminProductDetails = require("../controller/products/adminProductDetails");
const createCoupon = require("../controller/orders/createCoupon");
const getProductsProperties = require("../controller/categories/getProductsProperties");
const checkCoupon = require("../controller/orders/checkCoupon");
const payment = require("../controller/orders/payment");
const createOrder = require("../controller/orders/createOrder");
const customerOrderDetails = require("../controller/orders/customerOrderDetails");
const customerOrders = require("../controller/orders/customerOrders");
const updateUserRole = require("../controller/users/updateUserRole");
const forgotPassword = require("../controller/users/forgotPassword");
const resetPassword = require("../controller/users/resetPassword");
const allOrders = require("../controller/orders/allOrders");
const subOrders = require("../controller/orders/subOrders");
const suborderDetails = require("../controller/orders/suborderDetails");
const updateOrderStatus = require("../controller/orders/updateOrderStatus");
const updateSuborderStatus = require("../controller/orders/updateSuborderStatus");
const adminDashboard = require("../controller/dashboard/adminDashboard");
const vendorDashboard = require("../controller/dashboard/vendorDashboard");
const searchProducts = require("../controller/products/searchProducts");
const searchByCatg = require("../controller/products/searchByCatg");
const getCoupons = require("../controller/orders/getCoupons");


router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/search/:query", searchProducts);
router.get("/search-by-catg/:product", searchByCatg);
router.get("/user-details", authToken, userDetails);
router.get("/get-products", getAllProducts);
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
router.post("/create-payment-intent", payment);
router.post("/create-order", authToken, createOrder);
router.get("/customer-orders", authToken, customerOrders);
router.get("/customer-order-details/:orderId", authToken, customerOrderDetails);
router.post("/update-user", authToken, updateUser);
router.get("/get-customer-coupons", authToken, getCoupons);


// cloudinary
router.post("/delete-media", authToken, deleteMedia);


// admin
router.get("/all-users", allUsers);
router.post("/update-user-role", authToken, updateUserRole);
router.get("/search-user/:key", authToken, searchUser);
router.post("/upload-product", authToken, uploadProduct);
router.post("/update-product", authToken, updateProduct);
router.post("/add-category", authToken, addCategory);
router.post("/admin-product-details", authToken, adminProductDetails);
router.get("/get-products-properties", authToken, getProductsProperties);
router.post("/create-coupon", authToken, createCoupon);
router.post("/check-coupon", authToken, checkCoupon);
router.get("/all-orders", authToken, allOrders);
router.get("/sub-orders/:orderId", authToken, subOrders);
router.get("/suborder-details/:suborderId", authToken, suborderDetails);
router.post("/update-order-status", authToken, updateOrderStatus);
router.post("/update-suborder-status", authToken, updateSuborderStatus);
router.get("/admin-dashboard", authToken, adminDashboard);
router.get("/vendor-dashboard", authToken, vendorDashboard);

module.exports = router;
