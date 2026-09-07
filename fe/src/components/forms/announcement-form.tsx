import {Box, Button, TextField} from "@mui/material";
import {z} from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    title: z.string().trim().min(1, "Nadpis oznámení je povinný").max(100, "Nadpis oznámení může mít maximálně 100 znaků"),
    content: z.string().trim(),

})

export type AnnouncementFormData = z.infer<typeof schema>;

interface Props {
    defaultTitle?: string;
    defaultContent?: string;
    onSubmit: SubmitHandler<AnnouncementFormData>,
    submitButtonText: string;
    disableSubmit: boolean;
}



export function AnnouncementForm(props: Props) {
    const {control, handleSubmit} = useForm<AnnouncementFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            title: props.defaultTitle || "",
            content: props.defaultContent || "",
        }
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

            <Controller name="title"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField {...field}
                                       label="Titulek"
                                       error={!!fieldState.error}
                                       helperText={fieldState.error?.message}/>
                        )}
            />
            <Controller name="content"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField {...field}
                                       label="Obsah"
                                       error={!!fieldState.error}
                                       helperText={fieldState.error?.message}
                                       multiline
                                       minRows={4}/>
                        )}
            />

            <Button variant="contained" type="submit" disabled={props.disableSubmit}>{props.submitButtonText}</Button>

        </Box>
    )
}