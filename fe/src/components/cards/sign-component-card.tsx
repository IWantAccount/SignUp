import {Card, CardActions, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import {useNavigate} from "@tanstack/react-router";
import {componentTypeToCzech} from "@/domain/sign-component-type-enum.ts";
import type {SignComponentGetListDto} from "@/api/sign-component/sign-component-dtos.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteSignComponentOptions,} from "@/api/sign-component/sign-component-query-options.ts";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import {AuthService} from "@/api/util/auth-service.ts";


export function SignComponentCard(props: SignComponentGetListDto) {
    const queryClient = useQueryClient();
    const mutation = useMutation(createDeleteSignComponentOptions(props.id, queryClient));
    const navigate = useNavigate();

    return (
        <Card sx={{
            minWidth: 200,
        }}>
            {
                mutation.isPending ? (
                        <CardContent>
                            <Skeleton variant="text" width="80%"/>
                            <Skeleton variant="rectangular" width="80%"/>
                        </CardContent>
                    ) :
                    (
                        <Stack>
                            <CardContent>
                                <Stack>
                                    <Typography variant="body2">Popis: {props.textDescription}</Typography>
                                    <Typography
                                        variant="body2">Druh: {componentTypeToCzech(props.type)}</Typography>
                                </Stack>
                            </CardContent>
                            <CardActions sx={{justifyContent: "space-between"}}>
                                {
                                    AuthService.atLeastTeacher() && (
                                        <ZoomTooltip title={"upravit"}>
                                            <IconButton
                                                onClick={() => {
                                                    navigate({to: `/app/sign-components/${props.id}/edit/`});
                                                }}>
                                                <EditIcon/>
                                            </IconButton>
                                        </ZoomTooltip>
                                    )
                                }

                                {
                                    AuthService.atLeastTeacher() && (
                                        <ZoomTooltip title={"smazat"}>
                                            <IconButton
                                                onClick={() => mutation.mutate(props.id)}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </ZoomTooltip>
                                    )
                                }
                            </CardActions>
                        </Stack>

                    )
            }

        </Card>
    )
}