import {Avatar, Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {Link} from "@tanstack/react-router";

export interface UserCardProps {
    id: string;
    name: string;
    email: string;
    classname?: string;
}

export function UserCard({id, name, email, classname}: UserCardProps){
    return (
        <Card sx={{
            minWidth: 200
        }}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Avatar>
                        <AccountCircle sx={{fontSize: 60}}/>
                    </Avatar>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="body2">{email}</Typography>
                    <Typography variant="body2">{classname}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small"
                        component={Link} to={`/app/users/${id}`}>
                Detail</Button>
            </CardActions>
        </Card>
    )
}