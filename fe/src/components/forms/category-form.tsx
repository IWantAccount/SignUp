import {z} from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import {zodResolver} from "@hookform/resolvers/zod";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useState} from "react";
import { useDebounce } from 'use-debounce';
import {createSubjectByNameInfiniteQueryOptions} from "@/api/subject/subject-query-options.ts";
import type {Page} from "@/api/universal/dto/spring-boot-page.ts";
import type {SubjectGetListDto} from "@/api/subject/subject-dtos.ts";

const schema = z.object({
    name: z.string().trim().min(1, "Název kategorie je povinný").max(100, "Název kategorie může mít maximálně 100 znaků"),
    subjectId: z.string().min(1, "Předmět je povinný"),
})

export type CategoryFormData = z.infer<typeof schema>;


interface Props {
    defaultName?: string;
    defaultSubjectId?: string;
    defaultSubjectName?: string;
    onSubmit: SubmitHandler<CategoryFormData>;
    submitButtonText: string;
}

export function CategoryForm(props: Props) {

    const [searchItem, setSearchItem] = useState<string>("");
    const [debounced] = useDebounce(searchItem, 300);
    const subjectsQuery = useInfiniteQuery(createSubjectByNameInfiniteQueryOptions(debounced));

    const subjectItems = subjectsQuery.data?.pages.flatMap((page: Page<SubjectGetListDto>) => page.content) ?? [];

    const {control, handleSubmit} = useForm<CategoryFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            name: props.defaultName || "",
            subjectId: props.defaultSubjectId || "",
        }
    });

    return (
        <Box component="form"
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
                render={({field, fieldState}) => (
                    <Autocomplete<SubjectGetListDto, false, false, false>
                        options={subjectItems}
                        getOptionLabel={(o: SubjectGetListDto) => o.name}
                        isOptionEqualToValue={(a: SubjectGetListDto, b: SubjectGetListDto) => a.id === b.id}
                        onChange={(_, newVal) => field.onChange(newVal?.id ?? "")}
                        onInputChange={(_, newInputValue) => {
                            setSearchItem(newInputValue);
                        }}
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
                        ListboxProps={{
                            onScroll: (event) => {
                                const listboxNode = event.currentTarget;
                                if (
                                    listboxNode.scrollTop + listboxNode.clientHeight >=
                                    listboxNode.scrollHeight - 5
                                ) {
                                    if (subjectsQuery.hasNextPage && !subjectsQuery.isFetchingNextPage) {
                                        subjectsQuery.fetchNextPage();
                                    }
                                }
                            }
                        }}
                        loading={subjectsQuery.isFetchingNextPage}
                        loadingText="Načítám"/>
                )}
            />

            <Button variant="contained" type="submit">{props.submitButtonText}</Button>

        </Box>
    )

}