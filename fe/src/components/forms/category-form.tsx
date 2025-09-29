import {z} from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().trim().min(1, "Název kategorie je povinný").max(100, "Název kategorie může mít maximálně 100 znaků"),
    subjectId: z.string().min(1, "Předmět je povinný"),
})

export type CategoryFormData = z.infer<typeof schema>;

interface SubjectNameId {
    subjectName: string;
    subjectId: string;
}

interface Props {
    defaultName?: string;
    defaultSubjectId?: string;
    defaultSubjectName?: string;
    subjects: SubjectNameId[];
    onSubmit: SubmitHandler<CategoryFormData>;
    submitButtonText: string;
}

export function CategoryForm(props: Props) {

    const options: SubjectNameId[] = [
        {subjectName: "ČZJ1", subjectId: "1"},
        {subjectName: "ČZJ2", subjectId: "2"},
        {subjectName: "ČZJ konverzace 1", subjectId: "3"},
        {subjectName: "ČZJ konverzace 2", subjectId: "4"},
    ]

    const {control, handleSubmit} = useForm<CategoryFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            name: props.defaultName || "",
            subjectId: props.defaultSubjectId || "",
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

            <Controller name="name"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField {...field}
                                        label="Název kategorie"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}/>
                        )}
            />

            <Controller
                name="subjectId"
                control={control}
                render={({ field, fieldState }) => (
                    <Autocomplete<SubjectNameId, false, false, false>
                        options={options}
                        getOptionLabel={(o: SubjectNameId) => o.subjectName}
                        isOptionEqualToValue={(a: SubjectNameId, b: SubjectNameId) => a.subjectId === b.subjectId}
                        value={options.find(o => o.subjectId === field.value) ?? null}
                        onChange={(_, newVal) => field.onChange(newVal?.subjectId ?? "")}
                        onBlur={field.onBlur}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                inputRef={field.ref}
                                label="Předmět"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                        noOptionsText="Žádné položky"
                    />
                )}
            />

            <Button variant="contained" type="submit">{props.submitButtonText}</Button>

        </Box>
    )

}