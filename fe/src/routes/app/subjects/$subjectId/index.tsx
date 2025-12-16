import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {createGetSubjectByIdOptions, subjectQueryKey} from "@/api/subject/subject-query-options.ts";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteSubject} from "@/api/subject/subject-api.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {createCategoryInfiniteSearch} from "@/api/category/category-query-options.ts";
import {useState} from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Box, CircularProgress, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tabs} from "@mui/material";
import {AddClassroomToSubjectDialog} from "@/components/dialogs/add-classroom-to-subject-dialog.tsx";
import {AddStudentToSubjectDialog} from "@/components/dialogs/add-student-to-subject-dialog.tsx";
import {
    createUserSearchOptions, userQueryKey
} from "@/api/user/user-query-options.ts";
import {UserGrid} from "@/components/grids/user-grid.tsx";
import {useDebounce} from "use-debounce";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import {AuthService} from "@/api/util/auth-service.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {SubjectStudentDto} from "@/api/subject/subject-dtos.ts";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";

export const Route = createFileRoute('/app/subjects/$subjectId/')({
    component: RouteComponent
})

function RouteComponent() {
    const navigate = useNavigate()
    const {subjectId} = Route.useParams();
    const queryClient = useQueryClient();

    const isPresentQuery = useQuery({
        queryKey: [userQueryKey, subjectQueryKey, AuthService.getUserId(), "present"],
        queryFn: async () => {
            const dto: SubjectStudentDto = {studentId: AuthService.getUserId(), subjectId}
            const res = await api.post<boolean>(buildPath(["subject", "student-present"]), dto);
            return res.data;
        }
    })
    const removeYourselfMutation = useMutation({
        mutationKey: [userQueryKey, subjectQueryKey, AuthService.getUserId(), "present"],
        mutationFn: async () => {
            const dto: SubjectStudentDto = {studentId: AuthService.getUserId(), subjectId}
            await api.post(buildPath(["subject", "remove-student"]), dto);
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [subjectQueryKey]}),
                queryClient.invalidateQueries({queryKey: [userQueryKey]}),
                navigate({
                    to: "/app/home"
                })
            ])
        }
    })
    const [categoriesSearch, setCategoriesSearch] = useState<string>("");

    const [studentSearch, setStudentSearch] = useState<string>("");
    const [debouncedCategorySearch] = useDebounce(categoriesSearch, 300);

    const [debouncedStudentSearch] = useDebounce(studentSearch, 300);
    const subjectQuery = useQuery(createGetSubjectByIdOptions(subjectId));
    const categoryQuery = useInfiniteQuery(createCategoryInfiniteSearch({
        search: debouncedCategorySearch,
        subjectId: subjectId
    }));
    const studentQuery = useInfiniteQuery(createUserSearchOptions({
        dto: {
            name: debouncedStudentSearch,
            subjectId: subjectId
        }
    }));
    const [addClassroomDialogOpened, setAddClassroomDialogOpened] = useState(false);
    const [addStudentDialogOpened, setAddStudentDialogOpened] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"categories" | "students">("categories");

    const deleteMutation = useMutation({
        mutationFn: () => deleteSubject(subjectId),
        onSuccess: async () => {
            await navigate({
                to: "/app/subjects",
            });
            await queryClient.invalidateQueries({queryKey: [subjectQueryKey]});
        }
    })

    if (subjectQuery.isPending || isPresentQuery.isPending) return <BackdropLoading/>
    if (subjectQuery.isError || categoryQuery.isError || studentQuery.isError || isPresentQuery.isError) return <></>

    const students = studentQuery.data?.pages.flatMap(page => page.content);
    const categories = categoryQuery.data?.pages.flatMap(page => page.content);

    return (
        <TopBarItemsGrid>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    px: 2,
                    py: 1,
                }}>

                <Box sx={{width: "100%", display: "flex", flexWrap: "nowrap", alignItems: "center"}}>
                    <SearchableCardSectionTopBarActions
                        title={subjectQuery.data.name}
                        onSearch={
                            (value: string) => {
                                if (selectedTab === "categories") {
                                    setCategoriesSearch(value)
                                } else if (selectedTab === "students") {
                                    setStudentSearch(value)
                                }
                            }
                        }
                        onDelete={
                            () => {
                                deleteMutation.mutate()
                                queryClient.invalidateQueries({queryKey: [subjectQueryKey, subjectId]})
                            }
                        }
                        onEditNavigate={
                            () => {
                                navigate({
                                    to: '/app/subjects/$subjectId/edit',
                                    params: {subjectId},
                                })
                            }
                        }
                    />
                    {AuthService.isStudent() && isPresentQuery.data && (
                        removeYourselfMutation.isPending ? (
                            <CircularProgress color="secondary"/>
                        ) : (
                            <ZoomTooltip title={"Odejít z předmětu"}>
                                <IconButton onClick={() => removeYourselfMutation.mutate()}>
                                    <DirectionsRunIcon/>
                                </IconButton>
                            </ZoomTooltip>
                        ))
                    }
                </Box>
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    value={selectedTab}
                    onChange={(_, newValue) => setSelectedTab(newValue)}>
                    <Tab value="categories" label="Kategorie"/>
                    <Tab value="students" label="Studenti"/>
                </Tabs>
            </Box>

            {selectedTab === "categories" &&
                (categoryQuery.isPending ? <MultipleCardSkeleton/> : (<CategoryGrid list={categories ?? []}/>))}
            {selectedTab === "students" &&
                (studentQuery.isPending ? <MultipleCardSkeleton/> : (<UserGrid list={students ?? []}/>))}
            {AuthService.atLeastTeacher() && (
                <>
                    <AddSpeedDial openAddStudentDialog={() => setAddStudentDialogOpened(true)}
                                  openAddClassroomDialog={() => setAddClassroomDialogOpened(true)}/>
                    <AddClassroomToSubjectDialog subjectId={subjectId} open={addClassroomDialogOpened}
                                                 onClose={() => setAddClassroomDialogOpened(false)}/>
                    <AddStudentToSubjectDialog subjectId={subjectId} open={addStudentDialogOpened}
                                               onClose={() => setAddStudentDialogOpened(false)}/>
                </>
            )}

        </TopBarItemsGrid>
    )
}

interface SpeedDialProps {
    openAddStudentDialog: () => void;
    openAddClassroomDialog: () => void;
}

function AddSpeedDial(props: SpeedDialProps) {
    const actions = [
        {icon: GroupAddIcon, name: "Přidat třídu", action: props.openAddClassroomDialog},
        {icon: PersonAddIcon, name: "Přidat studenta", action: props.openAddStudentDialog},
    ]
    return (
        <SpeedDial
            ariaLabel="Přidat studenta"
            sx={{position: 'absolute', bottom: 16, right: 16}}
            icon={<SpeedDialIcon/>}>
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
