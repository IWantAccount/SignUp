import {Avatar, Button, Card, CardActions, CardContent, IconButton, Stack, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {Link, useNavigate} from "@tanstack/react-router";
import type {UserGetListDto} from "@/api/user/user-dtos.ts";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {createDeleteUserOptions} from "@/api/user/user-query-options.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";


export function UserCard({id, name, email, classroomName}: UserGetListDto){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(createDeleteUserOptions(id, queryClient));
    return (
        <Card sx={{
            minWidth: 200,
            position: "relative",
        }}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Avatar>
                        <AccountCircle sx={{fontSize: 60}}/>
                    </Avatar>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="body2">{email}</Typography>
                    <Typography variant="body2">{classroomName}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small"
                        component={Link} to={`/app/users/${id}`}>
                Detail</Button>
                <IconButton
                    onClick={() => {
                        navigate({to: `/app/users/${id}/edit/`});
                    }}
                >
                    <EditIcon/>
                </IconButton>

                <IconButton
                    onClick={() => mutation.mutate(id)}
                >
                    <ClearIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}