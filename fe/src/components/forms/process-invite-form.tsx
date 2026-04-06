import {z} from "zod";
import {useForm, type SubmitHandler, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, TextField, Typography} from "@mui/material";

const schema = z.object({
    name: z.string().trim().min(1, "Jméno je povinné").max(40, "Jméno může mít maximálně 40 znaků"),
    email: z.email("Neplatný formát emailu"),
    password: z
        .string()
        .trim()
        .refine((v) => !v || v.length >= 6, "Heslo musí mít alespoň 6 znaků"),
})

export type ProcessInviteForm = z.infer<typeof schema>;

interface Props {
    onSubmit: SubmitHandler<ProcessInviteForm>;
    submitButtonDisabled: boolean;
    header: string;
}

export function ProcessInviteForm(props: Props) {
    const {control, handleSubmit} = useForm<ProcessInviteForm>({
        resolver: zodResolver(schema),
        mode: "all"
    });

    return (
        <Box    component="form"
                onSubmit={handleSubmit(props.onSubmit)}
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

            <Typography variant="h5">{props.header}</Typography>
            <Controller name="name"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField  {...field}
                                        label="Jméno"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}/>

            <Controller name="email"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField  {...field}
                                        label="E-mail"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}/>

            <Controller name="password"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField  {...field}
                                        label="Heslo"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}/>

            <Button variant="contained" type="submit" disabled={props.submitButtonDisabled}>
                {props.submitButtonDisabled ? "Čekejte" : "Vytvořit účet"}
            </Button>

        </Box>
    )
}