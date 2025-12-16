import {createFileRoute, useNavigate} from '@tanstack/react-router'
import z from 'zod'
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, TextField, Typography} from '@mui/material';
import {useMutation} from "@tanstack/react-query";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";

export const Route = createFileRoute('/app/users/$userId/change-password')({
    component: RouteComponent,
})

const schema = z.object({
    newPassword: z.string().min(6, "Nové heslo musí mít alespoň 6 znaků"),
    confirmNewPassword: z.string().min(1, "Je nutné potvrdit nové heslo"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Hesla se neshodují",
    path: ["confirmNewPassword"],
})

type ChangePasswordFormData = z.infer<typeof schema>;

interface ChangePasswordDto {
    newPassword: string;
}

function RouteComponent() {
    const userId = Route.useParams().userId;
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: [userId, "change-password"],
        mutationFn: async (dto: ChangePasswordDto) => {
            await api.post(buildPath(["user", "change-password", userId]), dto);
        },
        onSuccess: () => {
            navigate({
                to: "/app/home"
            })
        }
    })
    const {control, handleSubmit} = useForm<ChangePasswordFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        }
    });
    return (
        <Box
            component="form"
            onSubmit={handleSubmit((data) => {
                mutation.mutate({
                    newPassword: data.newPassword,
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

          <Controller name="newPassword"
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
