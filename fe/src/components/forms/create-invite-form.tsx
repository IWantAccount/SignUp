import {z} from "zod";
import {type UserRoleEnum, userRoleEnum, userRoleToCzech} from "@/domain/user-role-enum.ts";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Autocomplete, Box, Button, TextField} from "@mui/material";

const schema = z.object({
    role: userRoleEnum.refine((role) => role !== null, {message: "Je nutné zadat roli!"})
})

interface Props {
    onSubmit: SubmitHandler<CreateInviteFormData>;
    submitButtonDisabled: boolean;
}

export type CreateInviteFormData = z.infer<typeof schema>;

export function CreateInviteForm(props: Props) {
    const {control, handleSubmit} = useForm<CreateInviteFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: userRoleEnum.enum.STUDENT
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
                        )}
            />
            <Button variant="contained" type = "submit" disabled={props.submitButtonDisabled}>
                {props.submitButtonDisabled ? "Čekejte" : "Vytvořit roli"}
            </Button>

        </Box>
    )
}