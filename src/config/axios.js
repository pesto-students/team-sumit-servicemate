import axios from "axios";

const restClient = axios.create({
    // baseURL: process.env.REACT_APP_SERVICEMATE_API
    baseURL: window.location.origin.replace("3000", "5000")
})

restClient.interceptors.request.use(config => {
    if (config.data) {
        config.data = JSON.stringify(config.data);
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
}, (error) => { return Promise.reject(error); })

export default restClient;