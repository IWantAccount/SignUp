import type { SignComponentTypeEnum } from "@/domain/sign-component-type-enum";
import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
} from "react-hook-form";
import {SignComponentAutocomplete} from "@/components/util/sign-component-autocomplete.tsx";

interface Props<TFieldValues extends FieldValues> {
    label: string;
    signComponentType: SignComponentTypeEnum;
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
}

//Ze značné části převzato z ChatGPT (Model 5.1 od OpenAI)
export function SignComponentFormAutocomplete<TFieldValues extends FieldValues>({
                                                                                label,
                                                                                signComponentType,
                                                                                name,
                                                                                control,
                                                                            }: Props<TFieldValues>) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <SignComponentAutocomplete
                    label={label}
                    signComponentType={signComponentType}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}/>
            )}
        />
    );
}