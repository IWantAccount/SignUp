import { useState } from "react";
import {type Control, Controller, type FieldValues, type Path} from "react-hook-form";
import {useDebounce} from "use-debounce";
import {createCategoryInfiniteSearch} from "@/api/category/category-query-options.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {Autocomplete, TextField} from "@mui/material";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";

interface Props<TFieldValues extends FieldValues> {
    label: string;
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
    required?: boolean;
}

export function CategoryAutocomplete<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [inputValue, setInputValue] = useState("");

    const query = useInfiniteQuery(createCategoryInfiniteSearch({searchName: debouncedSearch}));
    const items = query.data?.pages.flatMap(page => page.content) ?? [];

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({field, fieldState}) => {
                const selected = items.find(item => item.id === field.value) || null;

                return (
                    <Autocomplete<CategoryGetListDto, false, false, false>
                        value={selected}
                        options={items}
                        getOptionLabel={(item) => item.name}
                        onInputChange={(_, newInputValue) => {
                            setInputValue(newInputValue);
                            setSearch(newInputValue);
                        }}
                        inputValue={inputValue}
                        onChange={(_, newValue) => {
                            field.onChange(newValue ? newValue.id : "");
                        }}
                        onBlur={field.onBlur}
                        noOptionsText={"Žádné položky"}
                        renderInput={(params) => (
                            <TextField
                                required={props.required ?? false}
                                {...params}
                                label={props.label}
                                error={!!fieldState.error}
                                helperText={fieldState.error ? fieldState.error.message : ""}
                            />
                        )}
                    />
                );
            }}/>
    )
}