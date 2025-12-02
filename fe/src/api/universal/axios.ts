import axios from "axios"
export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const api = axios.create({
    baseURL: baseURL,
})

export default api;