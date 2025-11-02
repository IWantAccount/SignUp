import {Card, CardActionArea, CardActions, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import type {ClassroomGetListDto} from "@/api/classroom/classroom-dtos.ts";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteClassroomOptions} from "@/api/classroom/classroom-query-options.ts";

export function ClassroomCard(dto: ClassroomGetListDto) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(createDeleteClassroomOptions(dto.id, queryClient))
    return (
        <Card sx={{
            minWidth: 200
        }}>
            {
                mutation.isPending ? (
                    <CardContent>
                        <Stack spacing={2}>
                            <Skeleton variant="text" width="70%" height={32} />
                            <Skeleton variant="text" width="50%" height={24} />
                            <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                                <Skeleton variant="circular" width={36} height={36} />
                                <Skeleton variant="circular" width={36} height={36} />
                            </Stack>
                        </Stack>
                    </CardContent>
                ) :
                    (
                        <Stack>
                            <CardActionArea component={Link} to={`/app/classrooms/${dto.id}`}>
                                <CardContent>
                                    <Stack>
                                        <Typography variant="h6">{dto.name}</Typography>
                                        <Typography variant="body2">Počet studentů: {dto.numberOfStudents}</Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{justifyContent: "space-between"}}>
                                <IconButton
                                    onClick={() => {
                                        navigate({to: `/app/classrooms/${dto.id}/edit/`});
                                    }}>
                                    <EditIcon/>
                                </IconButton>

                                <IconButton
                                    onClick={() => mutation.mutate(dto.id)}>
                                    <ClearIcon/>
                                </IconButton>
                            </CardActions>
                        </Stack>
                    )
            }
        </Card>
    )
}