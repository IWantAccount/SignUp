import {z} from "zod";
import {type UserRoleEnum, userRoleEnum, userRoleToCzech} from "@/domain/user-role-enum.ts";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";

const schema = z.object({
    name: z.string().trim().min(1, "Jméno je povinné").max(40, "Jméno může mít maximálně 40 znaků"),
    email: z.email("Neplatný formát emailu"),
    password: z.string().trim().min(6, "Heslo musí mít alespoň 6 znaků"),
    role: userRoleEnum
        .refine((role) => role !== null, {
            message: "Role je povinná",
    }),
})

export type UserFormData = z.infer<typeof schema>;

interface Props {
    onSubmit: SubmitHandler<UserFormData>;
    header: string;
    submitButtonText: string;
    submitButtonDisabled: boolean;
    defaultName?: string;
    defaultEmail?: string;
    defaultPassword?: string;
    defaultRole?: UserRoleEnum;
}


export function UserForm(props: Props) {

    const {control, handleSubmit} = useForm<UserFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            name: props.defaultName ? props.defaultName : "",
            email: props.defaultEmail ? props.defaultEmail : "",
            password: props.defaultPassword? props.defaultPassword : "",
            role: props.defaultRole ? props.defaultRole : "STUDENT",
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

            <Controller name="role"
                        control={control}
                        render={({field, fieldState}) => (
                            <Autocomplete<UserRoleEnum, false, false, false>
                                options={userRoleEnum.options}
                                value={field.value}
                                onChange={(_, value) => field.onChange(value)}
                                getOptionLabel={(option) => userRoleToCzech(option)}
                                isOptionEqualToValue={(option, value) => option === value}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Role"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />


                        )}/>

            <Button variant="contained" type="submit" disabled={props.submitButtonDisabled}>{props.submitButtonText}</Button>
        </Box>
    )
}