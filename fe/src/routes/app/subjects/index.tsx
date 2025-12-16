import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SubjectGrid} from '@/components/grids/subject-grid';
import {useInfiniteQuery} from "@tanstack/react-query";
import { createSubjectSearchOptions,
} from "@/api/subject/subject-query-options.ts";
import type {SubjectGetListDto, SubjectSearchDto} from "@/api/subject/subject-dtos.ts";
import {Button, Stack} from "@mui/material";
import {useState} from "react";
import {useDebounce} from "use-debounce";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import {AuthService} from "@/api/util/auth-service.ts";
import {CustomSpeedDial, type SpeedDialActionItem} from "@/components/util/custom-speed-dial.tsx";
import SchoolIcon from "@mui/icons-material/School";

export const Route = createFileRoute('/app/subjects/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300)
    const dto: SubjectSearchDto = {
        search: debouncedSearch,
        studentId: AuthService.isStudent() ? AuthService.getUserId() : undefined,
    }
    const infiniteQuery = useInfiniteQuery(createSubjectSearchOptions(dto));
    const buttonText = !infiniteQuery.hasNextPage ?
        "Vše načteno" :
        infiniteQuery.isFetchingNextPage ? "Načítání..." : "Načíst další";

    const buttonIsDisabled = !infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage;

    const subjects: SubjectGetListDto[] = infiniteQuery.data?.pages.flatMap(page => page.content) || [];

    return (
        <Stack sx={{padding: 2}} spacing={2} alignItems="center">
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions title={"Předměty"} onSearch={(searchItem: string) => {setSearchItem(searchItem)}} />
                {
                    infiniteQuery.isPending ? <MultipleCardSkeleton/> :
                        infiniteQuery.isError ? (<></>) : (
                            <>
                                <SubjectGrid list={subjects}/>
                                {AuthService.atLeastTeacher() && <SubjectSpeedDial/>}
                            </>
                        )
                }
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

function SubjectSpeedDial() {
    const navigate = useNavigate();
    const actions: SpeedDialActionItem[] = [
        {
            icon: <SchoolIcon color="secondary"/>,
            name: "Přidat předmět",
            action: async () => {
                navigate({
                    to: '/app/subjects/create',
                })
            }
        }
    ]

    return (
        <CustomSpeedDial actions={actions}/>
    )
}
