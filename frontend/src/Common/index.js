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
    current_user : {
        url: `/api/user-details`,
        method: 'get'
    },
    all_users : {
        url: `/api/all-users`,
        method: 'get'
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
    

}

export default SummaryApi;
