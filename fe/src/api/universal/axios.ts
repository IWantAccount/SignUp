import {process} from "std-env";
import axios from "axios"

const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:8080/api',
})

export default api;