import {Button, Card, CardActions, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteCategoryOptions} from "@/api/category/category-query-options.ts";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {AuthService} from "@/api/util/auth-service.ts";
import {TypographyNowrapTooltip} from "@/components/util/typography-nowrap-tooltip.tsx";

export function CategoryCard(props: CategoryGetListDto) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(createDeleteCategoryOptions(props.id, queryClient));

    return (
        <Card sx={{
            width: 220,
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
                                <TypographyNowrapTooltip text={props.name} variant={"h6"}/>
                                <ZoomTooltip title={props.subjectNameId.name}>
                                    <Button variant="contained"
                                            sx={{whiteSpace: "hidden", width: "100%", textAlign: "center"}}
                                            component={Link} to={`/app/subjects/${props.subjectNameId.id}/`}>
                                        {props.subjectNameId.name}</Button>
                                </ZoomTooltip>
                                <Typography variant="body2">Počet znaků: {props.numberOfSigns}</Typography>
                            </Stack>
                        </CardContent>
                        <CardActions sx={{justifyContent: "center", px: 0}}>
                            <Button size="small"
                                    component={Link} to={`/app/categories/${props.id}/`}
                            >Detail</Button>
                            {
                                AuthService.atLeastTeacher() && (
                                    <ZoomTooltip title={"upravit"}>
                                        <IconButton component={Link} to={`/app/categories/${props.id}/edit/`}>
                                            <EditIcon/>
                                        </IconButton>
                                    </ZoomTooltip>
                                )
                            }
                            {
                                AuthService.atLeastTeacher() && (
                                    <ZoomTooltip title={"smazat"}>
                                        <IconButton
                                            onClick={() => deleteMutation.mutate()}>
                                            <ClearIcon color={"error"}/>
                                        </IconButton>
                                    </ZoomTooltip>
                                )
                            }
                        </CardActions>
                    </>
                )
            }
        </Card>
    )
}