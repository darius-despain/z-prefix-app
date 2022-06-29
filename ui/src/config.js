
const config = {
    development: {
        apiUrl: "http://localhost:8080"
    },

    //replace with url of deployed api
    production: {
        apiUrl: "https://[yourappName]-api.herokuapp.com"
    },

    test: {
        apiUrl: ''
    }
}

export default config;