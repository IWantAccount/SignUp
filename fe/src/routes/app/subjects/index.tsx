import {createFileRoute} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SubjectGrid} from '@/components/grids/subject-grid';
import {useInfiniteQuery} from "@tanstack/react-query";
import {createSubjectInfiniteQueryOptions} from "@/api/subject/subject-query-options.ts";
import type {SubjectGetListDto} from "@/api/subject/subject-dtos.ts";
import {Button, Stack} from "@mui/material";

export const Route = createFileRoute('/app/subjects/')({
    component: RouteComponent,
})

function RouteComponent() {
    const infiniteQuery = useInfiniteQuery(createSubjectInfiniteQueryOptions());
    const subjects: SubjectGetListDto[] = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
    const buttonText = !infiniteQuery.hasNextPage ?
        "Vše načteno" :
        infiniteQuery.isFetchingNextPage ? "Načítání..." : "Načíst další";

    const buttonIsDisabled = !infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage;

    return (
        <Stack sx={{padding: 2}} spacing={2} alignItems="center">
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions title={"Předměty"} onSearch={(searchItem: string) => {/*TODO funkční search*/
                }}/>
                <SubjectGrid list={subjects}></SubjectGrid>
            </TopBarItemsGrid>
            <Button onClick={() => infiniteQuery.fetchNextPage()}
                    disabled={buttonIsDisabled}
                    sx={{maxWidth: 200}}
                    variant="outlined">
                {buttonText}
            </Button>
        </Stack>

    )
}
