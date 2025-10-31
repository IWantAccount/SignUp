import { Alert, AlertTitle} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import {useNavigate} from "@tanstack/react-router";

interface Props {
    title?: string;
    message?: string;
}

export function ErrorAlert({ title = "Chyba", message }: Props) {
    const navigate = useNavigate()
    return (
        <Alert
            severity="error"
            variant="filled"
            icon={<ErrorOutline fontSize="inherit" />}
            onClose={() => navigate({
                to: "/app",
            })}
            sx={{
                borderRadius: 2,
                boxShadow: 4,
                p: 2,
                maxWidth: 500,
                mx: "auto",
                mt: 2,
            }}
        >
            <AlertTitle>{title}</AlertTitle>
            {message ?? "Nastala chyba"}
        </Alert>
    );
}