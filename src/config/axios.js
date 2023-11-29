import axios from 'axios';

const restClient = axios.create({
    baseURL: process.env.REACT_APP_SERVICEMATE_API
    // baseURL: window.location.origin.replace('3000', '5000')
});

export default restClient;