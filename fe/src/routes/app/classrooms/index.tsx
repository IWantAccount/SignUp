import { createFileRoute } from '@tanstack/react-router'
import {ClassroomGrid} from "@/components/grids/classroom-grid.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import {createClassroomInfiniteQueryOptions} from "@/api/classroom/classroom-query-options.ts";
import type {ClassroomGetListDto} from "@/api/classroom/classroom-dtos.ts";
import {Button, Stack, Typography} from "@mui/material";

export const Route = createFileRoute('/app/classrooms/')({
  component: RouteComponent,
})

function RouteComponent() {
    const infiniteQuery = useInfiniteQuery(createClassroomInfiniteQueryOptions());
    const classrooms: ClassroomGetListDto[] = infiniteQuery.data?.pages.flatMap(page => page.content) || [];
  return (
      <>
          <Stack sx={{padding: 2}} spacing={2} alignItems="center">
              <Typography variant="h4">Třídy</Typography>
              <ClassroomGrid list={classrooms}/>
              <Button   onClick={() => infiniteQuery.fetchNextPage()}
                        disabled={!infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage}
                        sx={{maxWidth: 200}}
                        variant="outlined">
                  {!infiniteQuery.hasNextPage ?
                  "Vše načteno" :
                  infiniteQuery.isFetchingNextPage ? "Načítání..." : "Načíst další"}
              </Button>
          </Stack>
      </>
  )
}
