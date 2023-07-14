import axios from "axios";

const apiCall = axios.create({
    baseURL: window.location.host.replace("3000", "5000")
})

export default apiCall;