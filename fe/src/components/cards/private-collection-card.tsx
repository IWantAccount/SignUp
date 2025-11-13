import {Button, Card, CardActions, CardContent, IconButton, Skeleton, Typography} from "@mui/material";
import {Link, useNavigate} from "@tanstack/react-router";
import type {PrivateCollectionGetListDto} from "@/api/private-collection/private-collection-dtos.ts";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteCollectionByIdOptions} from "@/api/private-collection/private-collection-query-options.ts";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";

export function PrivateCollectionCard(dto: PrivateCollectionGetListDto) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(createDeleteCollectionByIdOptions(dto.id, queryClient))

    return (
        <Card sx={{minWidth: 200, minHeight: 100}}>
            {mutation.isPending ? (
                <CardContent>
                    <Skeleton variant="text" width="80%"/>
                    <Skeleton variant="rectangular" width="80%"/>
                </CardContent>
            ) : (
                <>
                    <CardContent>
                        <Typography variant="h5">{dto.name}</Typography>
                    </CardContent>
                    <CardActions sx={{justifyContent: "space-around"}}>
                        <Button component={Link} to={`/app/private-collections/${dto.id}/`}>
                            Detail
                        </Button>
                        <ZoomTooltip title={"upravit"}>
                            <IconButton
                                onClick={() => navigate({to: `/app/private-collections/${dto.id}/edit/`})}>
                                <EditIcon/>
                            </IconButton>
                        </ZoomTooltip>

                        <ZoomTooltip title={"smazat"}>
                            <IconButton onClick={() => mutation.mutate(dto.id)}>
                                <ClearIcon/>
                            </IconButton>
                        </ZoomTooltip>
                    </CardActions>
                </>
            )}
        </Card>

    )
}
