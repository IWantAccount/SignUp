import {createClassroomInfiniteQueryOptions} from "@/api/classroom/classroom-query-options";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {useDebounce} from "use-debounce";
import type {ClassroomGetListDto} from "@/api/classroom/classroom-dtos.ts";
import {BaseDialog} from "@/components/dialogs/base-dialog.tsx";
import type {SubjectClassroomDto} from "@/api/subject/subject-dtos.ts";
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {createAddClassroomToSubjectOptions} from "@/api/subject/subject-query-options.ts";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";

interface DialogProps {
    subjectId: string;
    open: boolean;
    onClose: () => void;
}

export function AddClassroomToSubjectDialog(props: DialogProps) {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedInput] = useDebounce(searchItem, 300);
    const classroomQuery
        = useInfiniteQuery(createClassroomInfiniteQueryOptions(debouncedInput));

    if (classroomQuery.isError) return <></>;

    const dataToDisplay: ClassroomGetListDto[]
        = classroomQuery.data?.pages.flatMap((page) => page.content) ?? [];

    return (
        <BaseDialog
            onClose={props.onClose}
            open={props.open}
            onSearchChange={(item: string) => {
                setSearchItem(item)
            }}
            title={"Přidat celou třídu do předmětu"}
            searchPlaceholder={"Hledat třídu podle jména"}
            queryIsPending={classroomQuery.isPending}
            fetchNextPage={classroomQuery.fetchNextPage}
            fetchButtonText={
                classroomQuery.hasNextPage ?
                    (classroomQuery.isPending ? "Čekejte" : "Načíst další")
                    : "Vše načteno"
            }
            fetchButtonDisabled={
                classroomQuery.isPending || !classroomQuery.hasNextPage
            }>
            {
                dataToDisplay.map(classroom => (
                    <ListItem dto={{classroomId: classroom.id, subjectId: props.subjectId}} classroomName={classroom.name}/>
                ))
            }
        </BaseDialog>
    )
}

interface ListItemProps {
    dto: SubjectClassroomDto,
    classroomName: string,
}

function ListItem(props: ListItemProps) {
    const queryClient = useQueryClient();
    const addMutation = useMutation(createAddClassroomToSubjectOptions(props.dto, queryClient));
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{p: 1.5}}>
            <Typography>{props.classroomName}</Typography>
            {
                addMutation.isPending ? (
                        <CircularProgress color="secondary"/>
                    ) :
                    (
                        <ZoomTooltip title={"Přidat celou třídu do předmětu"}>
                            <IconButton onClick={() => {
                                addMutation.mutate()
                            }}>
                                <GroupAddIcon/>
                            </IconButton>
                        </ZoomTooltip>
                    )
            }
        </Box>
    )
}