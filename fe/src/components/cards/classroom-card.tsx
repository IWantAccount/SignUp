import {Button, Card, CardActions, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {ClassroomGetListDto} from "@/api/classroom/classroom-dtos.ts";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteClassroomOptions} from "@/api/classroom/classroom-query-options.ts";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import {AuthService} from "@/api/util/auth-service.ts";
import {useState} from "react";
import {Confirm} from "@/components/util/confirm.tsx";

export function ClassroomCard(dto: ClassroomGetListDto) {
    const queryClient = useQueryClient();
    const mutation = useMutation(createDeleteClassroomOptions(dto.id, queryClient))
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    return (
        <>
            <Card sx={{
                width: 200
            }}>
                {
                    mutation.isPending ? (
                            <CardContent>
                                <Stack spacing={2}>
                                    <Skeleton variant="text" width="70%" height={32}/>
                                    <Skeleton variant="text" width="50%" height={24}/>
                                    <Stack direction="row" justifyContent="space-between" sx={{mt: 2}}>
                                        <Skeleton variant="circular" width={36} height={36}/>
                                        <Skeleton variant="circular" width={36} height={36}/>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        ) :
                        (
                            <Stack>
                                <CardContent>
                                    <Stack>
                                        <ZoomTooltip title={dto.name}>
                                            <Typography
                                                variant="h6"
                                                noWrap
                                                sx={{width: "100%"}}
                                            >{dto.name}</Typography>
                                        </ZoomTooltip>
                                        <Typography variant="body2">Počet studentů: {dto.numberOfStudents}</Typography>
                                    </Stack>
                                </CardContent>
                                <CardActions sx={{justifyContent: "space-between"}}>
                                    <Button component={Link} to={`/app/classrooms/${dto.id}/`}>
                                        Detail
                                    </Button>
                                    {
                                        AuthService.atLeastTeacher() && (
                                            <ZoomTooltip title={"upravit"}>
                                                <IconButton component={Link} to={`/app/classrooms/${dto.id}/edit/`}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </ZoomTooltip>
                                        )
                                    }
                                    {
                                        AuthService.atLeastTeacher() && (
                                            <ZoomTooltip title={"smazat"}>
                                                <IconButton
                                                    onClick={() => setConfirmOpen(true)}>
                                                    <ClearIcon color={"error"}/>
                                                </IconButton>
                                            </ZoomTooltip>
                                        )
                                    }
                                </CardActions>
                            </Stack>
                        )
                }
            </Card>
            <Confirm open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={mutation.mutate}/>
        </>
    )
}