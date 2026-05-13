import {Button, Card, CardActions, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {SubjectGetListDto} from "@/api/subject/subject-dtos.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteSubjectOptions} from "@/api/subject/subject-query-options.ts";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {AuthService} from "@/api/util/auth-service.ts";
import {TypographyNowrapTooltip} from "@/components/util/typography-nowrap-tooltip.tsx";

export function SubjectCard(props: SubjectGetListDto) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(createDeleteSubjectOptions(props.id, queryClient));

    return (
        <Card sx={{
            width: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"

        }}>
            {
                deleteMutation.isPending ? (
                        <>
                            <CardContent>
                                <Skeleton variant="text" width="70%" height={32}/>
                                <Skeleton variant="text" width="40%" height={20}/>
                                <Skeleton variant="text" width="40%" height={20}/>
                            </CardContent>
                        </>
                    ) :
                    (
                        <>
                            <CardContent>
                                <Stack spacing={2} alignItems="center">
                                    <TypographyNowrapTooltip text={props.name} variant={"h6"}/>
                                    <Typography variant="body2">Počet kategorií: {props.numberOfCategories}</Typography>
                                    <Typography variant="body2">Počet studentů: {props.numberOfStudents}</Typography>
                                </Stack>
                            </CardContent>
                            <CardActions sx={{justifyContent: "center", px: 0}}>
                                <Button size="small"
                                        component={Link} to={`/app/subjects/${props.id}`}
                                >Detail</Button>
                                {
                                    AuthService.atLeastTeacher() && (
                                        <ZoomTooltip title={"upravit"}>
                                            <IconButton component={Link} to={`/app/subjects/${props.id}/edit/`}>
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