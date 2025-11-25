import {useState} from "react";
import {useDebounce} from "use-debounce";
import {useInfiniteQuery} from "@tanstack/react-query";
import {createCategoryInfiniteSearch} from "@/api/category/category-query-options.ts";
import {Autocomplete, TextField} from "@mui/material";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";

interface Props {
    label: string;
    value: string | null;
    onChange: (value: string | null) => void;
    required?: boolean;
    error?: boolean;
    helperText?: string;
}

export function CategoryAutocomplete(props: Props) {
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [inputValue, setInputValue] = useState<string>("");
    const query = useInfiniteQuery(createCategoryInfiniteSearch({search: debouncedSearch}));
    const items = query.data?.pages.flatMap(page => page.content) ?? [];
    const selected =
        items.find((item) => item.id === props.value) ?? null;
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
                props.onChange(newValue ? newValue.id : null);
            }}
            noOptionsText={"Žádné položky"}
            renderInput={(params) => (
                <TextField
                    required={props.required ?? false}
                    {...params}
                    label={props.label}
                    error={props.error}
                    helperText={props.helperText}
                />
            )}
        />
    )
}