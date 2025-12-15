import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {createGetUserByIdOptions} from "@/api/user/user-query-options.ts";
import {useQuery} from '@tanstack/react-query';
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import type {UserGetDetailDto} from "@/api/user/user-dtos.ts";
import {userRoleToCzech} from "@/domain/user-role-enum.ts";
import {AuthService} from '@/api/util/auth-service';
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import EditIcon from "@mui/icons-material/Edit";

export const Route = createFileRoute('/app/users/$userId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const userId = Route.useParams().userId;
    const userQuery = useQuery(createGetUserByIdOptions(userId));
    const navigate = useNavigate();
    if (userQuery.isPending) return <BackdropLoading/>
    if (userQuery.isError) return <></>

    const user: UserGetDetailDto = userQuery.data;
    return (
        <Stack
            sx={{padding: 2, width: "100%", alignItems: "center"}}
            spacing={2}>
            {
                (AuthService.atLeastAdmin() || AuthService.getUserId() === userId) && (
                    <Box sx={{display: "flex", alignItems: "space-between", gap: 2}}>
                        <Button
                            component={Link}
                            to={`/app/users/${userId}/change-password`}
                            variant="outlined">
                            Změnit heslo
                        </Button>

                        {
                            AuthService.atLeastAdmin() && (
                                <ZoomTooltip title={"upravit"}>
                                    <IconButton onClick={() => {
                                        navigate({
                                            to: `/app/users/${userId}/edit`
                                        })
                                    }}>
                                        <EditIcon/>
                                    </IconButton>
                                </ZoomTooltip>
                            )
                        }

                    </Box>
                )
            }
            <Typography variant="h5">{user.name}</Typography>
            <Row label={"email"} value={user.email}/>
            <Row label={"role"} value={userRoleToCzech(user.role)}/>
            {
                user.classroomName &&
                <Row label={"třída"} value={user.classroomName}/>
            }
        </Stack>
    )
}

interface RowProps {
    label: string;
    value: string;
}

function Row({label, value}: RowProps) {
    return (
        <Box sx={{display: "flex", gap: 2, alignItems: "space-between", flexWrap: "nowrap"}}>
            <Typography variant="h6">{label}:</Typography>
            <Typography variant="h6">{value}</Typography>
        </Box>
    )
}
