const base_url = process.env.REACT_APP_API_URL

const SummaryApi = {
    signup : {
        url: `${base_url}/api/signup`,
        method: 'post'
    },
    login : {
        url: `${base_url}/api/login`,
        method: 'post'
    },
    forgot_password : {
        url: `${base_url}/api/forgot-password`,
        method: 'post'
    },
    reset_password : {
        url: `${base_url}/api/reset-password`,
        method: 'post'
    },
    current_user : {
        url: `${base_url}/api/user-details`,
        method: 'get'
    },
    all_users : {
        url: `${base_url}/api/all-users`,
        method: 'get'
    },
    update_user_role : {
        url: `${base_url}/api/update-user-role`,
        method: 'post'
    },
    update_user : {
        url: `${base_url}/api/update-user`,
        method: 'post'
    },
    search_user : {
        url: `${base_url}/api/search-user`,
        method: 'get'
    },
    upload_product : {
        url: `${base_url}/api/upload-product`,
        method: 'post'
    },
    all_products : {
        url: `${base_url}/api/get-products`,
        method: 'get'
    },
    search_products : {
        url: `${base_url}/api/search`,
        method: 'get'
    },
    search_by_catg : {
        url: `${base_url}/api/search-by-catg`,
        method: 'get'
    },
    admin_product_details : {
        url: `${base_url}/api/admin-product-details`,
        method: 'post'
    },
    update_product : {
        url: `${base_url}/api/update-product`,
        method: 'post'
    },
    get_categories : {
        url: `${base_url}/api/get-categories`,
        method: 'get'
    },
    add_categories : {
        url: `${base_url}/api/add-category`,
        method: 'post'
    },
    catgwiseproducts : {
        url: `${base_url}/api/catgwiseproducts`,
        method: 'post'
    },
    productdetails : {
        url: `${base_url}/api/productdetails`,
        method: 'post'
    },
    add_to_cart : {
        url: `${base_url}/api/add-to-cart`,
        method: 'post'
    },
    view_cart : {
        url: `${base_url}/api/view-cart`,
        method: 'get'
    },
    update_cart : {
        url: `${base_url}/api/update-cart`,
        method: 'post'
    },
    cart_products_details : {
        url: `${base_url}/api/cart-products-details`,
        method: 'get'
    },
    add_to_favourite : {
        url: `${base_url}/api/add-to-favourite`,
        method: 'post'
    },
    view_favourite : {
        url: `${base_url}/api/view-favourite`,
        method: 'get'
    },
    favourite_products_details : {
        url: `${base_url}/api/favourite-products-details`,
        method: 'get'
    },
    add_new_review : {
        url: `${base_url}/api/add-new-review`,
        method: 'post'
    },
    read_reviews : {
        url: `${base_url}/api/read-reviews`,
        method: 'post'
    },
    reply_to_review : {
        url: `${base_url}/api/reply-to-review`,
        method: 'post'
    },
    product_rating : {
        url: `${base_url}/api/product-rating`,
        method: 'post'
    },
    delete_media : {
        url: `${base_url}/api/delete-media`,
        method: 'post'
    },
    create_coupon : {
        url: `${base_url}/api/create-coupon`,
        method: 'post'
    },
    check_coupon : {
        url: `${base_url}/api/check-coupon`,
        method: 'post'
    },
    get_products_properties : {
        url: `${base_url}/api/get-products-properties`,
        method: 'get'
    },
    create_payment_intent : {
        url: `${base_url}/api/create-payment-intent`,
        method: 'post'
    },
    create_order : {
        url: `${base_url}/api/create-order`,
        method: 'post'
    },
    customer_orders : {
        url: `${base_url}/api/customer-orders`,
        method: 'get'
    },
    customer_order_details: {
        url: `${base_url}/api/customer-order-details`,
        method: 'get'
    },
    all_orders : {
        url: `${base_url}/api/all-orders`,
        method: 'get'
    },
    suborder_details : {
        url: `${base_url}/api/suborder-details`,
        method: 'get'
    },
    sub_orders : {
        url: `${base_url}/api/sub-orders`,
        method: 'get'
    },
    update_order_status : {
        url: `${base_url}/api/update-order-status`,
        method: 'post'
    },
    update_suborder_status : {
        url: `${base_url}/api/update-suborder-status`,
        method: 'post'
    },
    admin_dashboard : {
        url: `${base_url}/api/admin-dashboard`,
        method: 'get'
    },
    vendor_dashboard : {
        url: `${base_url}/api/vendor-dashboard`,
        method: 'get'
    },
    get_customer_coupons : {
        url: `${base_url}/api/get-customer-coupons`,
        method: 'get'
    },
}

export default SummaryApi;
