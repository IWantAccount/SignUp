import {Avatar, Card, CardActions, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useNavigate} from "@tanstack/react-router";
import type {UserGetListDto} from "@/api/user/user-dtos.ts";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {createDeleteUserOptions} from "@/api/user/user-query-options.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import {AuthService} from "@/api/util/auth-service.ts";

export function UserCard({id, name, email, classroomName}: UserGetListDto){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(createDeleteUserOptions(id, queryClient));
    return (
        <Card sx={{
            minWidth: 200,
            position: "relative",
        }}>
            {
                mutation.isPending ?
                    (
                        <CardContent>
                            <Stack spacing={2} alignItems="center">
                                <Skeleton variant="circular" width={60} height={60}/>
                                <Skeleton variant="text" width="60%" height={24} />
                                <Skeleton variant="text" width="80%" height={20} />
                                <Skeleton variant="text" width="70%" height={20} />
                            </Stack>
                        </CardContent>
                    ) :
                    (
                        <CardContent>
                            <Stack spacing={2} alignItems="center">
                                <Avatar>
                                    <AccountCircle sx={{fontSize: 60}}/>
                                </Avatar>
                                <Typography variant="subtitle1">{name}</Typography>
                                <Typography variant="body2">{email}</Typography>
                                <Typography variant="body2">{classroomName}</Typography>
                            </Stack>
                            <CardActions sx={{justifyContent: "space-around"}}>
                                {
                                    AuthService.atLeastAdmin() && (
                                        <ZoomTooltip title={"upravit"}>
                                            <IconButton
                                                onClick={() => {
                                                    navigate({to: `/app/users/${id}/edit/`});
                                                }}>
                                                <EditIcon/>
                                            </IconButton>
                                        </ZoomTooltip>
                                    )
                                }

                                {
                                    AuthService.atLeastAdmin() && (
                                        <ZoomTooltip title={"smazat"}>
                                            <IconButton
                                                onClick={() => mutation.mutate(id)}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </ZoomTooltip>
                                    )
                                }
                            </CardActions>
                        </CardContent>
                    )
            }
        </Card>
    )
}