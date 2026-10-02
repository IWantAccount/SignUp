import {createFileRoute, useNavigate} from '@tanstack/react-router'
import z from "zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, TextField, Typography} from "@mui/material";
import {createPasswordRestoreQueryOpt} from "@/api/password/password-query-options.ts";

export const Route = createFileRoute('/password/restore/$id')({
  component: RouteComponent,
})

const schema = z.object({
    password: z.string().min(6, "Nové heslo musí mít alespoň 6 znaků"),
    confirmNewPassword: z.string().min(1, "Je nutné potvrdit nové heslo"),
}).refine((data) => data.password === data.confirmNewPassword, {
    message: "Hesla se neshodují",
    path: ["confirmNewPassword"],
})

type ChangePasswordFormData = z.infer<typeof schema>;

function RouteComponent() {
    const id = Route.useParams().id;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(createPasswordRestoreQueryOpt(queryClient, navigate))
    const {control, handleSubmit} = useForm<ChangePasswordFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            password: "",
            confirmNewPassword: "",
        }
    });
    return (
        <Box
            component="form"
            onSubmit={handleSubmit((data) => {
                mutation.mutate({
                    password: data.password,
                    reqId: id
                })
            })}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                px: 5,
                py: 2,
                maxWidth: 500,
                mx: "auto",
                width: "100%",
                boxSizing: "border-box",
            }}>

            <Typography variant="h5">Změna hesla</Typography>

            <Controller name="password"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField {...field}
                                       label="Nové heslo"
                                       type="password"
                                       error={!!fieldState.error}
                                       helperText={fieldState.error?.message}/>
                        )}
            />

            <Controller name="confirmNewPassword"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField {...field}
                                       label="Potvrďte nové heslo"
                                       type="password"
                                       error={!!fieldState.error}
                                       helperText={fieldState.error?.message}/>
                        )}
            />

            <Button variant="contained" type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Čekejte" : "Změnit heslo"}
            </Button>

        </Box>
    )
}
