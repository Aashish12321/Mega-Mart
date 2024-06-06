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
}

export default SummaryApi;
