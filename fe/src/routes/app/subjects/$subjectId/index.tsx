import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {createGetSubjectByIdOptions, subjectQueryKey} from "@/api/subject/subject-query-options.ts";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteSubject} from "@/api/subject/subject-api.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {createCategoryInfiniteQuery} from "@/api/category/category-query-options.ts";
import {useState} from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tabs} from "@mui/material";
import {AddClassroomToSubjectDialog} from "@/components/dialogs/add-classroom-to-subject-dialog.tsx";
import {AddStudentToSubjectDialog} from "@/components/dialogs/add-student-to-subject-dialog.tsx";
import {
    createGetUserBySubjectInfiniteQueryOptions
} from "@/api/user/user-query-options.ts";
import {UserGrid} from "@/components/grids/user-grid.tsx";

export const Route = createFileRoute('/app/subjects/$subjectId/')({
    component: RouteComponent
})

function RouteComponent() {
    const navigate = useNavigate()
    const [categoriesSearch, setCategoriesSearch] =  useState<string>("");
    const [studentSearch, setStudentSearch] =  useState<string>("");
    const {subjectId} = Route.useParams();

    const subjectQuery = useQuery(createGetSubjectByIdOptions(subjectId));
    const categoryQuery = useInfiniteQuery(createCategoryInfiniteQuery(categoriesSearch, subjectId));
    const studentQuery = useInfiniteQuery(createGetUserBySubjectInfiniteQueryOptions(subjectId, studentSearch));
    const [addClassroomDialogOpened, setAddClassroomDialogOpened] = useState(false);
    const [addStudentDialogOpened, setAddStudentDialogOpened] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"categories" | "students">("categories");
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteSubject(subjectId),
        onSuccess: async () => {
            navigate({
                to: "/app/subjects",
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
            queryClient.invalidateQueries({queryKey: [subjectQueryKey]});
        }
    })

    if(subjectQuery.isPending || categoryQuery.isPending || studentQuery.isPending) return <BackdropLoading/>
    if(subjectQuery.isError || categoryQuery.isError || studentQuery.isError) return <></>

    const categories = categoryQuery.data.pages.flatMap(page => page.content);
    const students = studentQuery.data?.pages.flatMap(page => page.content);

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

                <SearchableCardSectionTopBarActions
                    title={subjectQuery.data.name}
                    onSearch={
                        (value: string) => {
                            if(selectedTab === "categories") {
                                setCategoriesSearch(value)
                            }
                            else if(selectedTab === "students") {
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
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    value={selectedTab}
                    onChange={(_, newValue) => setSelectedTab(newValue)}>
                    <Tab value="categories" label="Kategorie"/>
                    <Tab value="students" label="Studenti"/>
                </Tabs>
            </Box>

            {selectedTab === "categories" && (<CategoryGrid list={categories}/>)}
            {selectedTab === "students" && (<UserGrid list={students}/>)}
            <AddSpeedDial openAddStudentDialog={() => setAddStudentDialogOpened(true)} openAddClassroomDialog={() => setAddClassroomDialogOpened(true)}/>
            <AddClassroomToSubjectDialog subjectId={subjectId} open={addClassroomDialogOpened} onClose={() => setAddClassroomDialogOpened(false)}/>
            <AddStudentToSubjectDialog subjectId={subjectId} open={addStudentDialogOpened} onClose={() => setAddStudentDialogOpened(false)}/>
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
