import type {SignComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";
import {useState} from "react";
import {useDebounce} from "use-debounce";
import {useInfiniteQuery} from "@tanstack/react-query";
import {createSignComponentSearch} from "@/api/sign-component/sign-component-query-options.ts";
import type {SignComponentGetListDto} from "@/api/sign-component/sign-component-dtos.ts";
import type {Page} from "@/api/universal/pagination/spring-boot-page.ts";
import {Autocomplete, TextField} from "@mui/material";

interface Props {
    label: string;
    signComponentType: SignComponentTypeEnum;
    value: string | null;
    onChange: (newValue: string | null) => void;
    error?: boolean;
    helperText?: string;
}

//Psáno s pomocí ChatGPT (Model 5.1 od OpenAI)
export function SignComponentAutocomplete(props: Props) {
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [inputValue, setInputValue] = useState("");

    const query = useInfiniteQuery(
        createSignComponentSearch({description: debouncedSearch, type: props.signComponentType})
    );

    const items: SignComponentGetListDto[] = query.data?.pages.flatMap((page: Page<SignComponentGetListDto>) => page.content) ?? [];
    const selected = items.find((item) => item.id === props.value) || null;

    return (
        <Autocomplete<SignComponentGetListDto, false, false, false>
        value={selected}
        options={items}
        getOptionLabel={(item) => item.textDescription}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        onChange={(_, newVal) => props.onChange(newVal ? newVal.id : null)}
        inputValue={inputValue}
        onInputChange={(_, newInput) => {
            setInputValue(newInput);
            setSearch(newInput);
        }}
        renderInput={(params) => (
            <TextField
                {...params}
                label={props.label}
                error={!!props.error}
                helperText={props.helperText}
            />
        )}
        noOptionsText={"Žádné položky"}
        loading={query.isLoading || query.isFetchingNextPage}
        loadingText={"Načítání"}
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
    )
}