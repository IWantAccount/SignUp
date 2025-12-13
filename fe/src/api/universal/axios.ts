import axios from "axios"
import {AuthService} from "@/api/util/auth-service.ts";
import {enqueueSnackbar} from "notistack";
export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use(config => {
    const token = AuthService.getToken();

    if(AuthService.isExpired(1)) {
        AuthService.logout();
        enqueueSnackbar("Přihlášení vypršelo. Přihlaste se znovu, prosím.", {variant: "warning"});

        setTimeout(() => {
            window.location.replace("/login");
        }, 5000)

        return Promise.reject(new axios.Cancel("Token expired"));
    }

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default api;