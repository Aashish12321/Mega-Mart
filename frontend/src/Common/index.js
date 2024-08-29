// const backendDomain = "http://localhost:7000"

const SummaryApi = {
    signup : {
        url: `/api/signup`,
        method: 'post'
    },
    login : {
        url: `/api/login`,
        method: 'post'
    },
    forgot_password : {
        url: `/api/forgot-password`,
        method: 'post'
    },
    reset_password : {
        url: `/api/reset-password`,
        method: 'post'
    },
    current_user : {
        url: `/api/user-details`,
        method: 'get'
    },
    all_users : {
        url: `/api/all-users`,
        method: 'get'
    },
    update_user_role : {
        url: `/api/update-user-role`,
        method: 'post'
    },
    update_user : {
        url: `/api/update-user`,
        method: 'post'
    },
    search_user : {
        url: `/api/search-user`,
        method: 'get'
    },
    upload_product : {
        url: `/api/upload-product`,
        method: 'post'
    },
    all_products : {
        url: `/api/get-products`,
        method: 'get'
    },
    search_products : {
        url: `/api/search`,
        method: 'get'
    },
    admin_product_details : {
        url: `/api/admin-product-details`,
        method: 'post'
    },
    update_product : {
        url: `/api/update-product`,
        method: 'post'
    },
    get_categories : {
        url: `/api/get-categories`,
        method: 'get'
    },
    add_categories : {
        url: `/api/add-category`,
        method: 'post'
    },
    catgwiseproducts : {
        url: `/api/catgwiseproducts`,
        method: 'post'
    },
    productdetails : {
        url: `/api/productdetails`,
        method: 'post'
    },
    add_to_cart : {
        url: `/api/add-to-cart`,
        method: 'post'
    },
    view_cart : {
        url: `/api/view-cart`,
        method: 'get'
    },
    update_cart : {
        url: `/api/update-cart`,
        method: 'post'
    },
    cart_products_details : {
        url: `/api/cart-products-details`,
        method: 'get'
    },
    add_to_favourite : {
        url: `/api/add-to-favourite`,
        method: 'post'
    },
    view_favourite : {
        url: `/api/view-favourite`,
        method: 'get'
    },
    favourite_products_details : {
        url: `/api/favourite-products-details`,
        method: 'get'
    },
    add_new_review : {
        url: `/api/add-new-review`,
        method: 'post'
    },
    read_reviews : {
        url: `/api/read-reviews`,
        method: 'post'
    },
    reply_to_review : {
        url: `/api/reply-to-review`,
        method: 'post'
    },
    product_rating : {
        url: `/api/product-rating`,
        method: 'post'
    },
    delete_media : {
        url: `/api/delete-media`,
        method: 'post'
    },
    create_coupon : {
        url: `/api/create-coupon`,
        method: 'post'
    },
    check_coupon : {
        url: `/api/check-coupon`,
        method: 'post'
    },
    get_products_properties : {
        url: `/api/get-products-properties`,
        method: 'get'
    },
    create_payment_intent : {
        url: `/api/create-payment-intent`,
        method: 'post'
    },
    create_order : {
        url: `/api/create-order`,
        method: 'post'
    },
    customer_orders : {
        url: `/api/customer-orders`,
        method: 'get'
    },
    customer_order_details: {
        url: `/api/customer-order-details`,
        method: 'get'
    },
    all_orders : {
        url: `/api/all-orders`,
        method: 'get'
    },
    suborder_details : {
        url: `/api/suborder-details`,
        method: 'get'
    },
    sub_orders : {
        url: `/api/sub-orders`,
        method: 'get'
    },
    update_order_status : {
        url: `/api/update-order-status`,
        method: 'post'
    },
    update_suborder_status : {
        url: `/api/update-suborder-status`,
        method: 'post'
    },
    admin_dashboard : {
        url: `/api/admin-dashboard`,
        method: 'get'
    },
    vendor_dashboard : {
        url: `/api/vendor-dashboard`,
        method: 'get'
    },
}

export default SummaryApi;
