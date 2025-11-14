import {Button, Stack} from '@mui/material'
import {createFileRoute} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {UserGrid} from "@/components/grids/user-grid.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import {createUserInfiniteQueryOptions} from "@/api/user/user-query-options.ts";
import {useState} from 'react';
import {useDebounce} from 'use-debounce';
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";

export const Route = createFileRoute('/app/users/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const infiniteQuery = useInfiniteQuery(createUserInfiniteQueryOptions(debouncedSearch));
    if (infiniteQuery.isError) return <></>

    const users = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
    return (
        <Stack sx={{padding: 2}} spacing={2} alignItems="center">
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions title={"Uživatelé"} onSearch={(search: string) => {
                    setSearchItem(search)
                }}/>
                {infiniteQuery.isPending ? <MultipleCardSkeleton/> : <UserGrid list={users}/>}
            </TopBarItemsGrid>
            <Button onClick={() => infiniteQuery.fetchNextPage()}
                    sx={{maxWidth: 200}}
                    variant="outlined"
                    disabled={infiniteQuery.isPending || !infiniteQuery.hasNextPage}>
                {!infiniteQuery.hasNextPage ? "Vše načteno" :
                    infiniteQuery.isFetchingNextPage ? "Načítání..." : "Načíst další"}
            </Button>
        </Stack>
    )
}
