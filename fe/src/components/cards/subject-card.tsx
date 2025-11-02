import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {SubjectGetListDto} from "@/api/subject/subject-dtos.ts";

export function SubjectCard({id, name, numberOfCategories, numberOfStudents}: SubjectGetListDto){

    return (
        <Card sx={{
            minWidth: 200,
        }}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h6"  >{name}</Typography>
                    <Typography variant="body2">Počet kategorií: {numberOfCategories}</Typography>
                    <Typography variant="body2">Počet studentů: {numberOfStudents}</Typography>
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