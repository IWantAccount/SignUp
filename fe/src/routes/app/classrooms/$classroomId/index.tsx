import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {UserGrid} from "@/components/grids/user-grid.tsx";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {classroomQueryKey, createGetClassroomByIdOptions} from "@/api/classroom/classroom-query-options.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {useState} from "react";
import {createGetUserByClassroomInfiniteQueryOptions} from "@/api/user/user-query-options.ts";
import type {UserGetListDto} from "@/api/user/user-dtos.ts";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {deleteClassroom} from "@/api/classroom/classroom-api.ts";
import { Button } from '@mui/material';

export const Route = createFileRoute('/app/classrooms/$classroomId/')({
    component: RouteComponent,
})

function RouteComponent() {
    //TODO nějaký tlačítka na přídání a odebrání uživatele
    const navigate = useNavigate();
    const [searchItem, setSearchItem] = useState<string>("");
    const classroomId = Route.useParams().classroomId;
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteClassroom(classroomId),
        onSuccess: () => {
            navigate({
                to: "/app/classrooms",
            });
            queryClient.invalidateQueries({queryKey: [classroomQueryKey, classroomId]})
        }
    });
    const classroomQuery = useQuery(createGetClassroomByIdOptions(classroomId));
    const userQuery = useInfiniteQuery(
        createGetUserByClassroomInfiniteQueryOptions(classroomId, searchItem)
    )

    if (classroomQuery.isPending || userQuery.isPending) return <BackdropLoading/>;
    if (classroomQuery.isError || userQuery.isError) return <></>;
    const users: UserGetListDto[] = userQuery.data.pages.flatMap(page => page.content);

    return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions title={classroomQuery.data.name}
                                                onEditNavigate={() => {
                                                    navigate({
                                                        to: '/app/classrooms/$classroomId/edit',
                                                        params: {classroomId: classroomId}
                                                    })
                                                }}
                                                onSearch={(value: string) => {
                                                    setSearchItem(value)
                                                }}
                                                onDelete={() => {
                                                    deleteMutation.mutate();
                                                }}/>
            <UserGrid list={users}/>
            <Button disabled={userQuery.isPending || !userQuery.hasNextPage} onClick={() => {userQuery.fetchNextPage()}} sx={{maxWidth: 200}}>
                {userQuery.isPending ? "Načítání" :
                userQuery.hasNextPage ? "Načíst další uživatele" : "Vše načteno"}
            </Button>
        </TopBarItemsGrid>

    )
}
