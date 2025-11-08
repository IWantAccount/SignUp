import {useState} from "react";
import { useDebounce } from "use-debounce";
import {useInfiniteQuery, useMutation} from "@tanstack/react-query";
import {createGetEnrolledByNameInfiniteQueryOptions} from "@/api/user/user-query-options.ts";
import type {StudentInSubjectDto} from "@/api/user/user-dtos.ts";
import {
    Box,
    Button,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
    createAddStudentToSubjectOptions,
    createRemoveStudentFromSubjectOptions
} from "@/api/subject/subject-query-options.ts";
import type {SubjectStudentDto} from "@/api/subject/subject-dtos.ts";

interface DialogProps {
    subjectId: string;
    open: boolean;
    onClose: () => void;
}

//Převzato částečně z dokumentace komponenty Dialog a částečně z ChatGPT (model 5, OpenAI)
//https://mui.com/material-ui/react-dialog/
export function AddStudentDialog(props: DialogProps) {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedInput] = useDebounce(searchItem, 300);
    const userQuery
        = useInfiniteQuery(createGetEnrolledByNameInfiniteQueryOptions(props.subjectId, debouncedInput))

    if(userQuery.isError) return <></>;
    const dataToDisplay: StudentInSubjectDto[]
        = userQuery.data?.pages.flatMap((page) => page.content) ?? [];


    return (
        <Dialog
        open={props.open}
        onClose={props.onClose}
        scroll="paper"
        maxWidth="lg"
        PaperProps={{ sx: { height: "80vh", display: "flex", width: 900, padding: "50px"} }}
        >
            <DialogTitle>
                {"Přidat studenta do předmětu"}
            </DialogTitle>
            <DialogContent dividers
                           sx={{ p: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
                <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Hledat studenta podle jména"
                onChange={(e) => setSearchItem(e.target.value)}
                autoFocus/>
                <Box sx={{ flex: 1, overflowY: "auto" }}>
                    {userQuery.isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : dataToDisplay.length === 0 ? (
                        <Box sx={{ color: "text.secondary", p: 2 }}>Nic nenalezeno.</Box>
                    ) : (
                        <List sx={{ py: 0 }}>
                            {dataToDisplay.map((s) => (
                                <div key={s.studentId}>
                                    <DialogListItem
                                        studentName={s.studentName}
                                        studentId={s.studentId}
                                        subjectId={props.subjectId}
                                        inSubject={s.inGivenSubject}
                                    />
                                    <Divider component="li" />
                                </div>
                            ))}
                        </List>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "center", p: 1.5 }}>
                        <Button
                            onClick={() => userQuery.fetchNextPage()}
                            disabled={userQuery.isFetchingNextPage || !userQuery.hasNextPage}
                            variant="outlined"
                        >
                            {userQuery.hasNextPage ?
                                (userQuery.isFetchingNextPage ? "Čekejte" : "Načíst další")
                            : "Vše načteno"}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()}>
                    {"Zavřít"}
                </Button>
            </DialogActions>
        </Dialog>
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