import {z} from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {componentTypeToCzech, signComponentTypeEnum, type SignComponentTypeEnum } from "@/domain/sign-component-type-enum";
import {Autocomplete, Box, Button, TextField } from "@mui/material";

const schema = z.object({
    textDescription: z.string().trim().min(1, "Popis je povinný").max(40, "Popis může mít maximálně 40 znaků"),
    type: signComponentTypeEnum
        .refine((type) => type !== null, {
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
    submitButtonDisabled?: boolean;
}

export function SignComponentForm(props: Props) {
    const {control, handleSubmit} = useForm<SignComponentFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            textDescription: props.defaultDescription || "",
            type: props.defaultType || "HAND_SHAPE",
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
            <Controller name="textDescription"
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
                    onChange={(_, value) => field.onChange(value ? value : "HAND_SHAPE")}
                    getOptionLabel={(option) => componentTypeToCzech(option)}
                    isOptionEqualToValue={(option, value) => option === value}
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

            <Button variant="contained" type="submit" disabled={props.submitButtonDisabled ? props.submitButtonDisabled : false}>
                {props.submitButtonText}
            </Button>
        </Box>
    )
}