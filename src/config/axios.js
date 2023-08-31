import axios from "axios";

const restClient = axios.create({
    baseURL: window.location.origin.replace("3000", "5000")
})

export default restClient;