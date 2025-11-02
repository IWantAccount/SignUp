import {createFileRoute} from '@tanstack/react-router'
import {Box} from "@mui/material";
import {UserCard} from "@/components/cards/user-card.tsx";

export const Route = createFileRoute('/app/debug/users')({
    component: RouteComponent,
})

function RouteComponent() {
    const users = Array.from({length: 20}, (_, i) => ({
        name: "Example user" + i.toString(),
        email: "example" + i.toString() + "@example.com",
        classroomName: "VOŠ 1",
    }));


    return (
        <>
            <h1>Zkouška vypisovaní uživatelů</h1>
            <Box sx={{display: 'flex', direction: 'row', gap: 2, flexWrap: 'wrap'}}>
                {
                    users.map((user, index) => (
                        <UserCard id={index.toString()} email={user.email} name={user.name}
                                  classname={user.classroomName}/>
                    ))
                }
            </Box>
        </>
    )
}
