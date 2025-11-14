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
import {Button, SpeedDial, SpeedDialAction, SpeedDialIcon} from '@mui/material';
import {useDebounce} from "use-debounce";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {AddStudentToClassRoomDialog} from "@/components/dialogs/add-student-to-classroom-dialog.tsx";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";

export const Route = createFileRoute('/app/classrooms/$classroomId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const classroomId = Route.useParams().classroomId;
    const queryClient = useQueryClient();
    const [addStudentDialogOpened, setAddStudentDialogOpened] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: () => deleteClassroom(classroomId),
        onSuccess: async () => {
            navigate({
                to: "/app/classrooms",
            });
            // Wait for a while. If queries are invalidated too quickly, classroom query might refetch and cause 404 error
            await new Promise(resolve => setTimeout(resolve, 1000));
            queryClient.invalidateQueries({queryKey: [classroomQueryKey]});
            queryClient.invalidateQueries({queryKey: [userQuery]});

        }
    });
    const classroomQuery = useQuery(createGetClassroomByIdOptions(classroomId));
    const userQuery = useInfiniteQuery(
        createGetUserByClassroomInfiniteQueryOptions(classroomId, debouncedSearch)
    )

    if (classroomQuery.isPending) return <BackdropLoading/>;
    if (classroomQuery.isError || userQuery.isError) return <></>;
    const users: UserGetListDto[] = userQuery.data?.pages.flatMap(page => page.content) || [];

    return (
        <>
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
                {userQuery.isPending ? <MultipleCardSkeleton/> : <UserGrid list={users}/>}
                <Button variant="outlined" disabled={userQuery.isPending || !userQuery.hasNextPage} onClick={() => {userQuery.fetchNextPage()}} sx={{maxWidth: 200}}>
                    {userQuery.isPending ? "Načítání" :
                        userQuery.hasNextPage ? "Načíst další uživatele" : "Vše načteno"}
                </Button>
            </TopBarItemsGrid>
            <AddStudentToClassRoomDialog classroomId={classroomId} open={addStudentDialogOpened} onClose={() => setAddStudentDialogOpened(false)}/>
            <AddSpeedDial openAddStudentDialog={() => setAddStudentDialogOpened(true)}/>
        </>

    )
}

interface SpeedDialProps {
    openAddStudentDialog: () => void;
}
function AddSpeedDial(props: SpeedDialProps) {
    const actions = [
        {icon: PersonAddIcon, name: "Přidat studenta", action: props.openAddStudentDialog },
    ];
    return (
        <SpeedDial
            ariaLabel="Přidat studenta"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}>
            {
                actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={<action.icon color={"secondary"}/>}
                        tooltipTitle={action.name}
                        onClick={action.action}/>
                ))
            }

        </SpeedDial>
    )
}