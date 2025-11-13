import { z } from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, TextField, Typography} from "@mui/material";

const schema = z.object({
    name: z.string().trim().min(1, "Název je povinný").max(60, "Jméno může mít maximálně 60 znaků"),
})

export type NameFormData = z.infer<typeof schema>;

interface Props {
    defaultName?: string;
    header: string;
    onSubmit: SubmitHandler<NameFormData>;
    submitButtonDisabled?: boolean;
    submitButtonText: string;
}

export function NameForm(props: Props) {

    const {control, handleSubmit} = useForm<NameFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            name: props.defaultName || "",
        }
    })

    return (
        <Box    component="form"
                onSubmit={handleSubmit(props.onSubmit)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
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
                                        label="Název"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}/>

            <Button variant="contained" type="submit" disabled={props.submitButtonDisabled}>{props.submitButtonText}</Button>

        </Box>

    )
}