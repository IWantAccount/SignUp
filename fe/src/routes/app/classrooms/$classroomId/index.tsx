import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {UserGrid} from "@/components/grids/user-grid.tsx";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {classroomQueryKey, createGetClassroomByIdOptions} from "@/api/classroom/classroom-query-options.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {useState} from "react";
import {createUserSearchOptions, userQueryKey} from "@/api/user/user-query-options.ts";
import type {StudentClassroomDto, UserGetListDto} from "@/api/user/user-dtos.ts";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {deleteClassroom} from "@/api/classroom/classroom-api.ts";
import {Box, Button} from '@mui/material';
import {useDebounce} from "use-debounce";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {AddStudentToClassRoomDialog} from "@/components/dialogs/add-student-to-classroom-dialog.tsx";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import {AuthService} from "@/api/util/auth-service.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import {CustomSpeedDial} from "@/components/util/custom-speed-dial.tsx";

export const Route = createFileRoute('/app/classrooms/$classroomId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const classroomId = Route.useParams().classroomId;

    const isPresentQuery = useQuery({
        queryKey: [userQueryKey, classroomQueryKey, AuthService.getUserId(), "present"],
        queryFn: async () => {
            const dto: StudentClassroomDto = {studentId: AuthService.getUserId(), classroomId}
            const res = await api.post<boolean>(buildPath(["classroom", "student-present"]), dto);
            return res.data;
        }
    })
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const [addStudentDialogOpened, setAddStudentDialogOpened] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: () => deleteClassroom(classroomId),
        onSuccess: async () => {
            await navigate({
                to: "/app/classrooms",
            });

            await Promise.all([
                queryClient.invalidateQueries({queryKey: [classroomQueryKey]}),
                queryClient.invalidateQueries({queryKey: [userQuery]})
            ]);

        }
    });
    const classroomQuery = useQuery(createGetClassroomByIdOptions(classroomId));
    const userQuery = useInfiniteQuery(
        createUserSearchOptions({dto: {name: debouncedSearch, classroomId: classroomId}})
    )

    if (classroomQuery.isPending || isPresentQuery.isPending) return <BackdropLoading/>;
    if (classroomQuery.isError || userQuery.isError || isPresentQuery.isError) return <></>;
    const users: UserGetListDto[] = userQuery.data?.pages.flatMap(page => page.content) || [];

    return (
        <>
            <TopBarItemsGrid>
                <Box sx={{width: "100%", display: "flex", flexWrap: "nowrap", alignItems: "center"}}>
                    <SearchableCardSectionTopBarActions title={classroomQuery.data.name}
                                                        onEditNavigate={
                                                            AuthService.atLeastTeacher() ?
                                                                async () => {
                                                                    await navigate({
                                                                        to: '/app/classrooms/$classroomId/edit',
                                                                        params: {classroomId: classroomId}
                                                                    })
                                                                }
                                                                : undefined
                                                        }
                                                        onSearch={(value: string) => {
                                                            setSearchItem(value)
                                                        }}
                                                        onDelete={
                                                            AuthService.atLeastTeacher() ?
                                                                () => {
                                                                    deleteMutation.mutate();
                                                                }
                                                                : undefined
                                                        }/>
                </Box>
                {userQuery.isPending ? <MultipleCardSkeleton/> : <UserGrid list={users}/>}
                <Button variant="outlined" disabled={userQuery.isPending || !userQuery.hasNextPage} onClick={() => {
                    userQuery.fetchNextPage()
                }} sx={{maxWidth: 200}}>
                    {userQuery.isPending ? "Načítání" :
                        userQuery.hasNextPage ? "Načíst další uživatele" : "Vše načteno"}
                </Button>
            </TopBarItemsGrid>
            {AuthService.atLeastTeacher() && (
                <>
                    <AddStudentToClassRoomDialog classroomId={classroomId} open={addStudentDialogOpened}
                                                 onClose={() => setAddStudentDialogOpened(false)}/>
                    <AddSpeedDial openAddStudentDialog={() => setAddStudentDialogOpened(true)}/>
                </>
            )}
        </>

    )
}

interface SpeedDialProps {
    openAddStudentDialog: () => void;
}

function AddSpeedDial(props: SpeedDialProps) {
    const actions = [
        {icon: <PersonAddIcon color="secondary"/>, name: "Přidat studenta", action: props.openAddStudentDialog},
    ];
    return (
        <CustomSpeedDial actions={actions}/>
    )
}