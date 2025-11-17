import {createFileRoute} from '@tanstack/react-router'
import { createSignComponentSearch,
} from "@/api/sign-component/sign-component-query-options.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import type {SignComponentGetListDto} from "@/api/sign-component/sign-component-dtos.ts";
import {Button, Stack} from "@mui/material";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SignComponentGrid} from "@/components/grids/sign-component-grid.tsx";
import {useState} from "react";
import {useDebounce} from "use-debounce";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";

export const Route = createFileRoute('/app/sign-components/')({
    component: RouteComponent,
})

function RouteComponent() {

    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebounce(search, 300);
    const infiniteQuery = useInfiniteQuery(createSignComponentSearch({description: debouncedSearch}));

    if (infiniteQuery.isError) return <></>;
    const components: SignComponentGetListDto[] = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
    return (
        <Stack sx={{padding: 2}} spacing={2} alignItems="center">
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions title={"Komponenty znaku"} onSearch={(searchItem: string) => {setSearch(searchItem)}}/>
                {infiniteQuery.isPending ? <MultipleCardSkeleton/> : <SignComponentGrid list={components}/>}
            </TopBarItemsGrid>
            <Button onClick={() => infiniteQuery.fetchNextPage()}
                    disabled={infiniteQuery.isPending || !infiniteQuery.hasNextPage}
                    sx={{maxWidth: 200}}
                    variant="outlined">
                {
                    infiniteQuery.isPending ? "Načítání" :
                        !infiniteQuery.hasNextPage ? "Vše načteno" : "Načíst další"
                }</Button>
        </Stack>
    )
}
