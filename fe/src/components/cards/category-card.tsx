import {Button, Card, CardActions, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteCategoryOptions} from "@/api/category/category-query-options.ts";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export function CategoryCard(props: CategoryGetListDto) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(createDeleteCategoryOptions(props.id, queryClient));

    return (
        <Card sx={{
            minWidth: 200,
        }}>
            {
                deleteMutation.isPending ? (
                    <CardContent>
                        <Stack spacing={2}>
                            <Skeleton variant="text" width="70%" height={32}/>
                            <Skeleton variant="text" width="50%" height={24}/>
                            <Skeleton variant="text" width="70%" height={32}/>
                        </Stack>
                    </CardContent>
                    ) :
                    (
                    <>
                        <CardContent>
                            <Stack spacing={2} alignItems="center">
                                <Typography variant="h6">{props.name}</Typography>
                                <Button variant="contained"
                                        component={Link} to={`/app/subjects/${props.subjectNameId.id}/`}>
                                    {props.subjectNameId.name}</Button>
                                <Typography variant="body2">Počet znaků: {props.numberOfSigns}</Typography>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Button size="small"
                                    component={Link} to={`/app/categories/${props.id}/`}
                            >Detail</Button>
                            <ZoomTooltip title={"upravit"}>
                                <IconButton component={Link} to={`/app/categories/${props.id}/edit/`}>
                                    <EditIcon/>
                                </IconButton>
                            </ZoomTooltip>
                            <ZoomTooltip title={"smazat"}>
                                <IconButton
                                    onClick={() => deleteMutation.mutate()}>
                                    <ClearIcon/>
                                </IconButton>
                            </ZoomTooltip>
                        </CardActions>
                    </>
                )
            }
        </Card>
    )
}