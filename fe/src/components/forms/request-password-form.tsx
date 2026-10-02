import {z} from "zod"
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, TextField, Typography} from "@mui/material";
const schema = z.object({
    email: z.email("Neplatný formát emailu")
})

export type ReqPasswordFormData = z.infer<typeof schema>

interface Props{
    onSubmit: SubmitHandler<ReqPasswordFormData>;
    submitButtonText: string;
    disableSubmit: boolean;
}

export function RequestPasswordForm (props: Props) {
    const {control, handleSubmit} = useForm<ReqPasswordFormData>({
        resolver: zodResolver(schema),
        mode: "all"
    })

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

            <Typography variant="h6">Obnova hesla</Typography>

            <Controller name="email"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField {...field}
                                       label="email"
                                       error={!!fieldState.error}
                                       helperText={fieldState.error?.message}/>
                        )}
            />

            <Button variant="contained" type="submit" disabled={props.disableSubmit}>{props.submitButtonText}</Button>

        </Box>
    )
}