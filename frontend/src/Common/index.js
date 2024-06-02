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
}

export default SummaryApi;
