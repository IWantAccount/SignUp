import {z} from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {componentTypeToCzechDict, signComponentTypeEnum, type SignComponentTypeEnum } from "@/domain/sign-component-type-enum";
import {Autocomplete, Box, Button, TextField } from "@mui/material";

const schema = z.object({
    description: z.string().trim().min(1, "Popis je povinný").max(40, "Popis může mít maximálně 40 znaků"),
    type: signComponentTypeEnum
        .nullable()
        .refine((v) => v !== null, {
            message: "Typ komponenty je povinný",
        }),
})

export type SignComponentFormData = z.infer<typeof schema>;

interface Props {
    header: string;
    defaultDescription?: string;
    defaultType?: z.infer<typeof signComponentTypeEnum>;
    onSubmit: SubmitHandler<SignComponentFormData>;
    submitButtonText: string;
    renderType: boolean
}

export function SignComponentForm(props: Props) {
    const {control, handleSubmit} = useForm<SignComponentFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            description: props.defaultDescription || "",
            type: props.defaultType || "HANDSHAPE",
        }
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
            <Controller name="description"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField  {...field}
                                        label="Popis komponenty"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}/>
            {
                props.renderType &&
            <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
                <Autocomplete<SignComponentTypeEnum, false, false, false>
                    options={signComponentTypeEnum.options}
                    value={field.value}
                    onChange={(_, v) => field.onChange(v)}
                    getOptionLabel={(o) => componentTypeToCzechDict(o)}
                    isOptionEqualToValue={(o, v) => o === v}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Typ komponenty znaku"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                    noOptionsText="Žádné položky"
                />
            )}
        />}

            <Button variant="contained" type="submit">{props.submitButtonText}</Button>
        </Box>
    )
}