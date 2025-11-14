import {createFileRoute} from '@tanstack/react-router'
import {useInfiniteQuery} from "@tanstack/react-query";
import {createCollectionInfiniteQueryOptions} from "@/api/private-collection/private-collection-query-options.ts";
import {Button, Stack} from "@mui/material";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {PrivateCollectionGrid} from "@/components/grids/private-collection-grid.tsx";
import { useState } from 'react';
import {useDebounce} from "use-debounce";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
export const Route = createFileRoute('/app/private-collections/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const infiniteQuery = useInfiniteQuery(createCollectionInfiniteQueryOptions(debouncedSearch));

    if(infiniteQuery.isError) return <></>;

    const collections = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
    const buttonText = !infiniteQuery.hasNextPage ?
        "Vše načteno" :
        infiniteQuery.isFetchingNextPage ? "Načítání..." : "Načíst další";
    const buttonDisabled = !infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage;


    return (
        <Stack sx={{padding: 2}} spacing={2} alignItems="center">
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions title={"Soukromé kolekce"} onSearch={(searchItem: string) => {setSearchItem(searchItem)}}/>
                {infiniteQuery.isPending ? <MultipleCardSkeleton/> : <PrivateCollectionGrid list={collections}/>}
            </TopBarItemsGrid>
            <Button onClick={() => infiniteQuery.fetchNextPage()}
                    disabled={buttonDisabled}
                    sx={{maxWidth: 200}}
                    variant="outlined">
                {buttonText}
            </Button>
        </Stack>
    )
}
