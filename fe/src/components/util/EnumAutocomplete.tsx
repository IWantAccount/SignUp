import {Autocomplete, TextField} from "@mui/material";

interface Props<TOption extends string | null> {
    label: string;
    options: readonly TOption[];
    getOptionLabel: (value: TOption | null) => string ;
    value: TOption;
    onChange: (value: TOption | null) => void;
    required?: boolean;
}

export function EnumAutocomplete<TOption extends string | null>(props: Props<TOption>) {
    return (
        <Autocomplete<TOption, false, false, false>
        options={props.options}
        value={props.value}
        onChange={(_, newValue) => props.onChange(newValue)}
        getOptionLabel={props.getOptionLabel}
        renderInput={(params => (
            <TextField
                {...params}
                label={props.label}
                required={props.required ?? false}
            />
        ))}/>
    )
}