import {process} from "std-env";
import axios from "axios"
export const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:8080/api'
const api = axios.create({
    baseURL: baseURL,
})

export default api;