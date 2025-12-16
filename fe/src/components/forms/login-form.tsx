import {z} from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, TextField} from "@mui/material"

const schema = z.object({
    name: z.string().min(1, "Zadejte jméno"),
    password: z.string().trim().min(1, "Zadejte heslo")
})

type LoginFormData = z.infer<typeof schema>;

interface Props {
    onSubmit: SubmitHandler<LoginFormData>,
    submitButtonText: string,
    submitButtonDisabled: boolean,
}

export function LoginForm(props: Props) {

    const {control, handleSubmit} = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            name: "",
            password: ""
        }
    })

    return (
        <Box
            component="form"
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
            <Controller name="name"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField  {...field}
                                        label="Jméno"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}/>

            <Controller name="password"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField  {...field}
                                        label="Heslo"
                                        type="password"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}/>

            <Button
                variant="contained"
                type="submit"
                disabled={props.submitButtonDisabled}>
                {props.submitButtonText}
            </Button>
        </Box>
    )
}