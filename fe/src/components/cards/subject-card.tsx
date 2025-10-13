import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
export interface SubjectCardProps {
    id: string;
    name: string;
    categoryCount: number;
    studentCount: number;
}

export function SubjectCard({id, name, categoryCount, studentCount}: SubjectCardProps){

    return (
        <Card sx={{
            minWidth: 200,
        }}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h6"  >{name}</Typography>
                    <Typography variant="body2">Počet kategorií: {categoryCount}</Typography>
                    <Typography variant="body2">Počet studentů: {studentCount}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small"
                        component={Link} to={`/app/subjects/${id}`}
                >Detail</Button>
            </CardActions>
        </Card>
    )
}