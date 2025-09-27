import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
export interface SubjectCardProps {
    id: string;
    name: string;
    categoryCount: number;
    studentCount: number;
}

export function SubjectCard({id, name, categoryCount, studentCount}: SubjectCardProps){
    //TODO přidat onClick, přesměrování na detail předmětu podle id.

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
                        onClick={() => console.log("jde se na detail předmět s id: " + id)}
                >Detail</Button>
            </CardActions>
        </Card>
    )
}