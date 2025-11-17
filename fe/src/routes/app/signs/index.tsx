import {createFileRoute} from '@tanstack/react-router'
import { useState } from 'react';
import {useDebounce} from "use-debounce";
import {useInfiniteQuery} from "@tanstack/react-query";
import {createSignTranslationSearchInfiniteOptions} from "@/api/sign/sign-query-options.ts";
import type {SignGetListDto} from "@/api/sign/sign-dtos.ts";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import {SignGrid} from "@/components/grids/sign-grid.tsx";
import {Button} from "@mui/material";

export const Route = createFileRoute('/app/signs/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const signsQuery = useInfiniteQuery(createSignTranslationSearchInfiniteOptions(debouncedSearch));

    if(signsQuery.isError) return <></>;

    const signs: SignGetListDto[] = signsQuery.data?.pages.flatMap(page => page.content) || [];

    return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions title={"Všechny znaky"} onSearch={(searchItem: string) => setSearchItem(searchItem)}/>
            {signsQuery.isPending ? <MultipleCardSkeleton/> : <SignGrid list={signs}/>}
            <Button
                onClick={() => signsQuery.fetchNextPage()}
                sx={{maxWidth: 200}}
                disabled={!signsQuery.hasNextPage || signsQuery.isFetchingNextPage}
                variant="outlined">
                {
                    !signsQuery.hasNextPage ?
                        "Vše načteno" :
                        signsQuery.isFetchingNextPage ? "Načítání..." : "Načíst další"
                }
            </Button>
        </TopBarItemsGrid>
    )
}
