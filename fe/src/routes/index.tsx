import {createFileRoute, redirect} from '@tanstack/react-router'
import '../App.css'
import {AuthService} from "@/api/util/auth-service.ts";

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        //If token is expired or about to expire in 5 minutes, redirect to login
        if(AuthService.isExpired(5) || !AuthService.isLoggedIn()) {
            throw redirect({
                to: '/login',
            })
        }
        else {
            throw redirect({
                to: '/app/home'
            })
        }
    },
    component: App,
})

function App() {

}
