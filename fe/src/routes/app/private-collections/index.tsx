import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useInfiniteQuery} from "@tanstack/react-query";
import {
    createCollectionSearchOptions
} from "@/api/private-collection/private-collection-query-options.ts";
import {Button, FormControlLabel, Stack} from "@mui/material";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {PrivateCollectionGrid} from "@/components/grids/private-collection-grid.tsx";
import { useState } from 'react';
import {useDebounce} from "use-debounce";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import type {CollectionSearchDto} from "@/api/private-collection/private-collection-dtos.ts";
import {AuthService} from "@/api/util/auth-service.ts";
import {CustomSpeedDial, type SpeedDialActionItem} from "@/components/util/custom-speed-dial.tsx";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
export const Route = createFileRoute('/app/private-collections/')({
    component: RouteComponent,
})
import Checkbox from '@mui/material/Checkbox';

function RouteComponent() {
    const [seeOthersCollections, setSeeOthersCollections] = useState<boolean>(false);
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const ownerId: string | undefined = seeOthersCollections ? undefined : AuthService.getUserId();
    const searchDto: CollectionSearchDto = {search: debouncedSearch, ownerId: ownerId};
    const infiniteQuery = useInfiniteQuery(createCollectionSearchOptions(searchDto));

    if(infiniteQuery.isError) return <></>;

    const collections = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
    const buttonText = !infiniteQuery.hasNextPage ?
        "Vše načteno" :
        infiniteQuery.isFetchingNextPage ? "Načítání..." : "Načíst další";
    const buttonDisabled = !infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage;


    return (
        <Stack sx={{padding: 2}} spacing={2} alignItems="center">
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions
                    title={"Soukromé kolekce"}
                    onSearch={(searchItem: string) => {setSearchItem(searchItem)}}
                    extraElement={
                        AuthService.atLeastAdmin() ? (
                            <FormControlLabel control={
                                <Checkbox
                                    checked={seeOthersCollections}
                                    onChange={(e) => setSeeOthersCollections(e.target.checked)}/>
                            } label={"Cizí kolekce"}/>
                        ) : undefined
                    }/>
                {infiniteQuery.isPending ? <MultipleCardSkeleton/> : <PrivateCollectionGrid list={collections}/>}
            </TopBarItemsGrid>
            <PrivateCollectionSpeedDial/>
            <Button onClick={() => infiniteQuery.fetchNextPage()}
                    disabled={buttonDisabled}
                    sx={{maxWidth: 200}}
                    variant="outlined">
                {buttonText}
            </Button>
        </Stack>
    )
}

function PrivateCollectionSpeedDial() {
    const navigate = useNavigate();
    const actions: SpeedDialActionItem[] = [
        {
            icon: <BookmarkAddIcon color="primary"/>,
            name: "Přidat soukromou kolekci",
            action: async () => {
                await navigate({
                    to: "/app/private-collections/create"
                })
            }
        }
    ]

    return (
        <CustomSpeedDial actions={actions}/>
    )
}
