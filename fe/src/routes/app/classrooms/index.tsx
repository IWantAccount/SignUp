import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {ClassroomGrid} from "@/components/grids/classroom-grid.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import {
    createClassroomInfiniteSearch
} from "@/api/classroom/classroom-query-options.ts";
import type {ClassroomGetListDto} from "@/api/classroom/classroom-dtos.ts";
import {Button} from "@mui/material";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {useState} from "react";
import {useDebounce} from "use-debounce";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import {CustomSpeedDial, type SpeedDialActionItem} from "@/components/util/custom-speed-dial.tsx";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {AuthService} from "@/api/util/auth-service.ts";

export const Route = createFileRoute('/app/classrooms/')({
  component: RouteComponent,
})

function RouteComponent() {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const infiniteQuery = useInfiniteQuery(createClassroomInfiniteSearch(debouncedSearch));
    const classrooms: ClassroomGetListDto[] = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
    if(infiniteQuery.isError) return <></>;

  return (
    <TopBarItemsGrid>
        <SearchableCardSectionTopBarActions title={"Všechny třídy"} onSearch={(search: string) => {setSearchItem(search)}}/>
        {infiniteQuery.isPending ? <MultipleCardSkeleton/> : (
            <>
                <ClassroomGrid list={classrooms}/>
                {AuthService.atLeastTeacher() && <ClassroomSpeedDial/>}
            </>
        )}
        <Button   onClick={() => infiniteQuery.fetchNextPage()}
                  disabled={!infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage}
                  sx={{maxWidth: 200}}
                  variant="outlined">
            {!infiniteQuery.hasNextPage ?
                "Vše načteno" :
                infiniteQuery.isFetchingNextPage ? "Načítání..." : "Načíst další"}
        </Button>
    </TopBarItemsGrid>
  )
}

function ClassroomSpeedDial() {
    const navigate = useNavigate();
    const actions: SpeedDialActionItem[] = [
        {
            icon: <GroupAddIcon color="secondary"/>,
            name: "Přidat třídu",
            action: async() => {
                await navigate({
                    to: '/app/classrooms/create'
                })
            }
        }
    ]

    return (
        <CustomSpeedDial actions={actions}/>
    )
}
