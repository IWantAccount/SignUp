import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import { Link } from "@tanstack/react-router";

export interface ClassroomCardProps {
    classroomId: string;
    name: string,
    studentCount: number,

}
export function ClassroomCard({classroomId, studentCount, name}: ClassroomCardProps) {
    return (
        <Card sx={{
            minWidth: 200
        }}>
            <CardActionArea component={Link} to={`/app/classrooms/${classroomId}`}>
                <CardContent>
                    <Stack>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="body2">Počet studentů: {studentCount}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}