import {createFileRoute} from '@tanstack/react-router'
import type {UserCardProps} from "@/components/cards/user-card.tsx";
import {UserGrid} from "@/components/grids/user-grid.tsx";
import {Stack, Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {createGetClassroomByIdOptions} from "@/api/classroom/classroom-query-options.ts";

export const Route = createFileRoute('/app/classrooms/$classroomId/')({
    component: RouteComponent,
})

function RouteComponent() {
    //TODO api call, nějaký tlačítka na přídání a odebrání uživatele
    const classroomId = Route.useParams().classroomId;
    const query = useSuspenseQuery(createGetClassroomByIdOptions(classroomId))
    const classname = query.data.name;
    const users: UserCardProps[] = [
        {
            id: "1",
            name: "Máňa",
            email: "mana@neco.com",
            classname: classname
        },
        {
            id: "2",
            name: "Honza",
            email: "jan.nezajimavy@neco.com",
            classname: classname
        },
        {
            id: "3",
            name: "Ignác",
            email: "ignac@blbyjmeno.com",
            classname: classname
        }
    ]

    return (
        <>
            <Stack sx={{padding: 2}} spacing={2} alignItems="center">
                <Typography variant="h4">{classname}</Typography>
                <UserGrid list={users}/>
            </Stack>
        </>

    )
}
