import {useState} from "react";
import {useDebounce} from "use-debounce";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    createAddStudentToClassroomOptions,
    createRemoveStudentFromClassroomOptions, createUserSearchOptions
} from "@/api/user/user-query-options.ts";
import {userRoleEnum} from "@/domain/user-role-enum.ts";
import type {UserGetListDto} from "@/api/user/user-dtos.ts";
import {BaseDialog} from "@/components/dialogs/base-dialog.tsx";
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from '@mui/icons-material/Block';
import {enqueueSnackbar} from "notistack";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";

interface DialogProps {
    classroomId: string;
    open: boolean;
    onClose: () => void;
}

export function AddStudentToClassRoomDialog(props: DialogProps) {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedInput] = useDebounce(searchItem, 300);
    const userQuery =
        useInfiniteQuery(createUserSearchOptions({dto: {name: debouncedInput, role: userRoleEnum.enum.STUDENT}}));

    if (userQuery.isError) return <></>;

    const dataToDisplay: UserGetListDto[]
        = userQuery.data?.pages.flatMap((page) => page.content) ?? [];

    return (
        <BaseDialog
            onClose={props.onClose}
            open={props.open}
            onSearchChange={(search: string) => setSearchItem(search)}
            title={"Přidat studenta do třídy"}
            searchPlaceholder={"Hledat studetna podle jména"}
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
                    <DialogListItem dto={student} classroomId={props.classroomId}/>
                ))
            }
        </BaseDialog>
    )
}

interface ListItemProps {
    dto: UserGetListDto;
    classroomId: string;
}

function DialogListItem({ dto, classroomId }: ListItemProps) {
    const queryClient = useQueryClient();
    const addMutation = useMutation(createAddStudentToClassroomOptions({studentId: dto.id, classroomId: classroomId}, queryClient));
    const removeMutation = useMutation(createRemoveStudentFromClassroomOptions({studentId: dto.id, classroomId: classroomId}, queryClient));

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 1.5 }}
        >
            <Typography>{dto.name}</Typography>
            {
                (addMutation.isPending || removeMutation.isPending) ? (
                        <CircularProgress color="secondary"/>
                    ) :
                    (dto.classroomId !== null && dto.classroomId !== classroomId) ? (
                        <IconButton onClick={() => {enqueueSnackbar({variant:"warning", message:"Student už je v jiné třídě"})}}>
                            <BlockIcon/>
                        </IconButton>
                    ) :
                        (
                            dto.classroomId === classroomId ? (
                                    <ZoomTooltip title={"Odebrat studenta z třídy"}>
                                        <IconButton onClick={() => {
                                            removeMutation.mutate();
                                        }}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </ZoomTooltip>
                                ) :
                                (
                                    <ZoomTooltip title={"Přidat studenta do třídy"}>
                                        <IconButton onClick={() => {
                                            addMutation.mutate()
                                        }}>
                                            <AddIcon/>
                                        </IconButton>
                                    </ZoomTooltip>

                                )
                        )

            }
        </Box>
    )
}