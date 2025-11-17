import type { SignComponentTypeEnum } from "@/domain/sign-component-type-enum";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createSignComponentSearch} from "@/api/sign-component/sign-component-query-options";
import { Autocomplete, TextField } from "@mui/material";
import type { SignComponentGetListDto } from "@/api/sign-component/sign-component-dtos";
import type { Page } from "@/api/universal/pagination/spring-boot-page";
import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues> {
    label: string;
    signComponentType: SignComponentTypeEnum;
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
}

//Ze značné části převzato z ChatGPT (Model 5.1 od OpenAI)
export function SignComponentAutocomplete<TFieldValues extends FieldValues>({
                                                                                label,
                                                                                signComponentType,
                                                                                name,
                                                                                control,
                                                                            }: Props<TFieldValues>) {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [inputValue, setInputValue] = useState("");

    const query = useInfiniteQuery(
        createSignComponentSearch({description: debouncedSearch, type: signComponentType})
    );

    const items: SignComponentGetListDto[] =
        query.data?.pages.flatMap(
            (page: Page<SignComponentGetListDto>) => page.content
        ) ?? [];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const selected =
                    items.find((item) => item.id === field.value) || null;

                return (
                    <Autocomplete<SignComponentGetListDto, false, false, false>
                        value={selected}
                        options={items}
                        getOptionLabel={(item) => item.textDescription}
                        isOptionEqualToValue={(a, b) => a.id === b.id}
                        onChange={(_, newVal) => field.onChange(newVal ? newVal.id : null)}
                        inputValue={inputValue}
                        onInputChange={(_, newInput) => {
                            setInputValue(newInput);
                            setSearch(newInput);
                        }}
                        onBlur={field.onBlur}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                inputRef={field.ref}
                                label={label}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                        noOptionsText="Žádné položky"
                        loading={query.isLoading || query.isFetchingNextPage}
                        loadingText="Načítání"
                        slotProps={{
                            listbox: {
                                onScroll: (e: React.UIEvent<HTMLUListElement>) => {
                                    const list = e.currentTarget;
                                    const nearBottom =
                                        list.scrollTop + list.clientHeight >=
                                        list.scrollHeight - 5;
                                    if (
                                        nearBottom &&
                                        query.hasNextPage &&
                                        !query.isFetchingNextPage
                                    ) {
                                        query.fetchNextPage();
                                    }
                                },
                            },
                        }}
                    />
                );
            }}
        />
    );
}