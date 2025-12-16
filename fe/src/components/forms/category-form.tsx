import {z} from "zod";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import {zodResolver} from "@hookform/resolvers/zod";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useState} from "react";
import { useDebounce } from 'use-debounce';
import {
    createSubjectSearchOptions
} from "@/api/subject/subject-query-options.ts";
import type {Page} from "@/api/universal/pagination/spring-boot-page.ts";
import type {SubjectGetListDto, SubjectSearchDto} from "@/api/subject/subject-dtos.ts";

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
    disableSubmit: boolean;
}

export function CategoryForm(props: Props) {

    const [searchItem, setSearchItem] = useState<string>("");
    const [debounced] = useDebounce(searchItem, 300);
    const searchDto: SubjectSearchDto = {
        search: debounced
    }
    const subjectsQuery = useInfiniteQuery(createSubjectSearchOptions(searchDto));
    const [inputValue, setInputValue] = useState<string>(props.defaultSubjectName || "");

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
                render={({field, fieldState}) => {

                    const selected = subjectItems.find(item => item.id === field.value) ??
                        (field.value ? {id: field.value, name: props.defaultName ?? ""} as SubjectGetListDto : null);

                    return (
                        <Autocomplete<SubjectGetListDto, false, false, false>
                            value={selected}
                            options={subjectItems}
                            getOptionLabel={(o: SubjectGetListDto) => o.name}
                            isOptionEqualToValue={(a: SubjectGetListDto, b: SubjectGetListDto) => a.id === b.id}
                            onChange={(_, newVal) => field.onChange(newVal?.id ?? "")}
                            inputValue={inputValue}
                            onInputChange={(_, newInputValue) => {
                                setSearchItem(newInputValue);
                                setInputValue(newInputValue)
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
                            slotProps={{
                                listbox: {
                                    onScroll: (e: React.UIEvent<HTMLUListElement>) => {
                                        const list = e.currentTarget;
                                        const nearBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 5;
                                        if (nearBottom && subjectsQuery.hasNextPage && !subjectsQuery.isFetchingNextPage) {
                                            subjectsQuery.fetchNextPage();
                                        }
                                    },
                                },
                            }}
                            loading={subjectsQuery.isFetchingNextPage}
                            loadingText="Načítám"/>
                    )
                }}
            />

            <Button variant="contained" type="submit" disabled={props.disableSubmit}>{props.submitButtonText}</Button>

        </Box>
    )

}