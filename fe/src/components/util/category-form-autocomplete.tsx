import {type Control, Controller, type FieldValues, type Path} from "react-hook-form";
import {CategoryAutocomplete} from "@/components/util/category-autocomplete.tsx";

interface Props<TFieldValues extends FieldValues> {
    label: string;
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
    required?: boolean;
}

export function CategoryFormAutocomplete<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({field, fieldState}) => (
                <CategoryAutocomplete
                    label={props.label}
                    value={field.value ?? null}
                    onChange={field.onChange}
                    required={props.required}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />
            )}/>
    )
}