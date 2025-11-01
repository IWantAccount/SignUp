import {createFileRoute} from '@tanstack/react-router'
import {createSignComponentInfiniteQueryOptions} from "@/api/sign-component/sign-component-query-options.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {ErrorAlert} from "@/components/util/error-alert.tsx";
import type {SignComponentGetListDto} from "@/api/sign-component/sign-component-dtos.ts";
import {Button, Stack} from "@mui/material";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SignComponentGrid} from "@/components/grids/sign-component-grid.tsx";

export const Route = createFileRoute('/app/sign-components/')({
    component: RouteComponent,
})

function RouteComponent() {

    const infiniteQuery = useInfiniteQuery(createSignComponentInfiniteQueryOptions());
    let responsibleQuery = infiniteQuery;

    if (responsibleQuery.isPending) return <BackdropLoading/>
    if (responsibleQuery.isError) return <ErrorAlert message={"Chyba při načítání komponent"}/>
    const components: SignComponentGetListDto[] = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
    return (
        <Stack sx={{padding: 2}} spacing={2} alignItems="center">
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions title={"Komponenty znaku"} onSearch={() => {/*TODO search*/
                    //responsibleQuery =
                    /*TODO search*/
                }}/>
                <SignComponentGrid list={components}/>
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
