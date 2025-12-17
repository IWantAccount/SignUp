import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {Box, Button, Divider, IconButton, Paper, Stack, Typography} from "@mui/material";
import {createGetUserByIdOptions} from "@/api/user/user-query-options.ts";
import {useQuery} from '@tanstack/react-query';
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import type {UserGetDetailDto} from "@/api/user/user-dtos.ts";
import {userRoleToCzech} from "@/domain/user-role-enum.ts";
import {AuthService} from '@/api/util/auth-service';
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import EditIcon from "@mui/icons-material/Edit";
import {StringAvatar} from "@/components/util/string-avatar.tsx";

export const Route = createFileRoute('/app/users/$userId/')({
    component: RouteComponent,
})
//Pomáhal psát ChatGPT (model 5.2, od OpenAI)
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
            <Paper sx={{width:'100%', maxWidth: 700, padding: 2}}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <StringAvatar name={user.name} />
                        <Box>
                            <Typography variant="h5">{user.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userRoleToCzech(user.role)}
                            </Typography>
                        </Box>
                    </Box>

                    {(AuthService.atLeastAdmin() || AuthService.getUserId() === userId) && (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button component={Link} to={`/app/users/${userId}/change-password`} variant="outlined" size="small">
                                Změnit heslo
                            </Button>

                            {AuthService.atLeastAdmin() && (
                                <ZoomTooltip title="Upravit">
                                    <IconButton onClick={() => navigate({ to: `/app/users/${userId}/edit` })}>
                                        <EditIcon />
                                    </IconButton>
                                </ZoomTooltip>
                            )}
                        </Box>
                    )}
                </Box>

                <Divider sx={{ mb: 2 }} />
                <Row label={"email"} value={user.email}/>
                <Row label={"role"} value={userRoleToCzech(user.role)}/>
                {
                    user.classroomName &&
                    <Row label={"třída"} value={user.classroomName}/>
                }
            </Paper>
        </Stack>
    )
}

interface RowProps {
    label: string;
    value: string;
}

function Row({ label, value }: RowProps) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, py: 0.75, minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "right", wordBreak: "break-word", minWidth: 0 }}>
                {value}
            </Typography>
        </Box>
    );
}
