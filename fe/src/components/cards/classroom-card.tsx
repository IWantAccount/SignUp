import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import { Link } from "@tanstack/react-router";
import type {ClassroomGetListDto} from "@/api/classroom/classroom-dtos.ts";

export function ClassroomCard(dto: ClassroomGetListDto) {
    return (
        <Card sx={{
            minWidth: 200
        }}>
            <CardActionArea component={Link} to={`/app/classrooms/${dto.id}`}>
                <CardContent>
                    <Stack>
                        <Typography variant="h6">{dto.name}</Typography>
                        <Typography variant="body2">Počet studentů: {dto.numberOfStudents}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}