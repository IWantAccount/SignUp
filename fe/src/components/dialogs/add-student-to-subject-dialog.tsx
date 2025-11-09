import {useState} from "react";
import { useDebounce } from "use-debounce";
import {useInfiniteQuery, useMutation} from "@tanstack/react-query";
import {createGetEnrolledByNameInfiniteQueryOptions} from "@/api/user/user-query-options.ts";
import type {StudentInSubjectDto} from "@/api/user/user-dtos.ts";
import {
    Box, CircularProgress,
    IconButton,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
    createAddStudentToSubjectOptions,
    createRemoveStudentFromSubjectOptions
} from "@/api/subject/subject-query-options.ts";
import type {SubjectStudentDto} from "@/api/subject/subject-dtos.ts";
import {BaseDialog} from "@/components/dialogs/base-dialog.tsx";

interface DialogProps {
    subjectId: string;
    open: boolean;
    onClose: () => void;
}


export function AddStudentToSubjectDialog(props: DialogProps) {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedInput] = useDebounce(searchItem, 300);
    const userQuery
        = useInfiniteQuery(createGetEnrolledByNameInfiniteQueryOptions(props.subjectId, debouncedInput))

    if(userQuery.isError) return <></>;
    const dataToDisplay: StudentInSubjectDto[]
        = userQuery.data?.pages.flatMap((page) => page.content) ?? [];


    return (
        <BaseDialog
            onClose={props.onClose}
            open={props.open}
            onSearchChange={(search: string) => {setSearchItem(search)}}
            title={"Přidat studenta do předmětu"}
            searchPlaceholder={"Hledat studenta podle jména"}
            queryIsPending={userQuery.isPending}
            fetchNextPage={userQuery.fetchNextPage}
            fetchButtonText={
                userQuery.hasNextPage ?
                    (userQuery.isPending ? "Čekejte" : "Načíst další") :
                    "Vše načteno"
            }
            fetchButtonDisabled={userQuery.isPending || !userQuery.hasNextPage}>

            {
                dataToDisplay.map(student => (
                    <DialogListItem
                        key={student.studentId}
                        studentName={student.studentName}
                        studentId={student.studentId}
                        subjectId={props.subjectId}
                        inSubject={student.inGivenSubject}
                    />
                ))
            }

        </BaseDialog>
    )


}

interface ListItemProps {
    studentName: string;
    studentId: string;
    subjectId: string;
    inSubject: boolean;
}
function DialogListItem(props: ListItemProps) {
    const subjectStudentDto: SubjectStudentDto = {studentId: props.studentId, subjectId: props.subjectId};
    const addMutation = useMutation(createAddStudentToSubjectOptions(subjectStudentDto));
    const removeMutation = useMutation(createRemoveStudentFromSubjectOptions(subjectStudentDto));

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 1.5 }}
        >
            <Typography>{props.studentName}</Typography>
            {
                (addMutation.isPending || removeMutation.isPending) ? (
                    <CircularProgress color="secondary"/>
                ) :
                    props.inSubject ? (
                        <IconButton onClick={() => {
                            removeMutation.mutate();
                        }}>
                            <ClearIcon/>
                        </IconButton>
                    ) :
                    (
                        <IconButton onClick={() => {
                            addMutation.mutate()
                        }}>
                            <AddIcon/>
                        </IconButton>

                    )
            }
        </Box>
    )
}