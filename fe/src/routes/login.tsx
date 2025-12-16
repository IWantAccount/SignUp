import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {LoginForm} from "@/components/forms/login-form.tsx";
import {useMutation} from "@tanstack/react-query";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import {AuthService} from "@/api/util/auth-service.ts";
import { Box } from '@mui/material';

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

interface LoginDto {
    name: string;
    password: string;
}

interface JwtResponseDto {
    token: string;
}

function RouteComponent() {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ["login"],
        mutationFn: async (dto: LoginDto) => {
            const res = await api.post<JwtResponseDto>(buildPath(["auth", "login"]), dto);
            return res.data;
        },
        onSuccess: async (data) => {
            AuthService.login(data.token);
            await navigate({
                to: "/app/home"
            })
        }
    })
    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: 3,
        }}>
            <Box
            component="img"
            src={"public/neslhk_logo.png"}
            alt="Logo neslhk"
            sx={{
                width: 250,
                maxWidth: "80%",
                height: "auto",
            }}/>
            <LoginForm
                onSubmit={({name, password}) => mutation.mutate({name, password})}
                submitButtonText={
                    mutation.isPending ? "Čekejte": "Přihlásit se"
                }
                submitButtonDisabled={
                    mutation.isPending
                }/>
        </Box>

    )
}
