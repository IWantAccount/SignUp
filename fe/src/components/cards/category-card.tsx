import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";

export function CategoryCard(props: CategoryGetListDto) {

    return (
        <Card sx={{
            minWidth: 200,
        }}>
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
            </CardActions>
        </Card>
    )
}