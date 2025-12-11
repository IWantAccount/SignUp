import axios from "axios"
import {AuthService} from "@/api/util/auth-service.ts";
export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use(config => {
    const token = AuthService.getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default api;