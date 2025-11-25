import {type Control, Controller, type FieldPath, type FieldValues} from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface EnumAutocompleteProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    TOption extends string
> {
    name: TName;
    control: Control<TFieldValues>;
    label: string;
    options: readonly TOption[];
    getOptionLabel: (value: TOption) => string;
    required?: boolean;
}
//Převzato z ChatGPT (Model 5.1 od OpenAI)
export function EnumFormAutocomplete<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    TOption extends string
>(props: EnumAutocompleteProps<TFieldValues, TName, TOption>) {
    const { name, control, label, options, getOptionLabel } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Autocomplete<TOption, false, false, false>
                    options={options}
                    value={field.value ?? null}
                    onChange={(_, value) => field.onChange(value)}
                    getOptionLabel={(option) => getOptionLabel(option)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            required={props.required ?? false}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                    onBlur={field.onBlur}
                />
            )}
        />
    );
}
