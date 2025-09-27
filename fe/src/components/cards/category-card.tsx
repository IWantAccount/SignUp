import {Button, Card, CardActions, CardContent, Typography, Stack} from "@mui/material";

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
                    <Button variant="contained" onClick={(e) => { e.stopPropagation(); console.log("jdeme na subject s id:" + subjectId); }}>
                        {subjectName}
                    </Button>
                    <Typography variant="body2">Počet znaků: {signCount}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={() => console.log("jde se na detail kateogire s id: " + categoryId)}
                >Detail</Button>
            </CardActions>
        </Card>
    )
}