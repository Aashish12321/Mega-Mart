const backendDomain = "http://localhost:7000"

const SummaryApi = {
    signup : {
        url: `${backendDomain}/api/signup`,
        method: 'post'
    },
    login : {
        url: `${backendDomain}/api/login`,
        method: 'post'
    },
    current_user : {
        url: `${backendDomain}/api/user-details`,
        method: 'get'
    },
    logout : {
        url: `${backendDomain}/api/logout`,
        method: 'get'
    },
    all_users : {
        url: `${backendDomain}/api/all-users`,
        method: 'get'
    },
    update_user : {
        url: `${backendDomain}/api/update-user`,
        method: 'post'
    },
}

export default SummaryApi;
