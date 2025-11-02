import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";

export interface CategoryCardProps {
    categoryId: string;
    categoryName: string;
    signCount: number;
    subjectId: string;
    subjectName: string;
}

export function CategoryCard({categoryId, categoryName, signCount, subjectId, subjectName}: CategoryCardProps) {

    return (
        <Card sx={{
            minWidth: 200,
        }}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h6">{categoryName}</Typography>
                    <Button variant="contained"
                            component={Link} to={`/app/subjects/${subjectId}/`}>
                        {subjectName}</Button>
                    <Typography variant="body2">Počet znaků: {signCount}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small"
                        component={Link} to={`/app/categories/${categoryId}/`}
                >Detail</Button>
            </CardActions>
        </Card>
    )
}