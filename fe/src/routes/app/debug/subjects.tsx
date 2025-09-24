import { createFileRoute } from '@tanstack/react-router'
import {Box} from "@mui/material";
import {SubjectCard} from "@/components/cards/subject-card.tsx";

export const Route = createFileRoute('/app/debug/subjects')({
  component: RouteComponent,
})

function RouteComponent() {
    const subjects = Array.from({ length: 20 }, (_, i) => ({
        name: "Předmět " + (i + 1).toString(),
        categoriesCount: i * 2,
        studentCount: i,
    }));


    return (
        <>
            <h1>Zkouška vypisovaní předmětů</h1>
            <Box sx={{display: 'flex', direction: 'row', gap: 2, flexWrap: 'wrap'}}>
                {
                    subjects.map((subject, index) => (
                        <SubjectCard id={index.toString()} name={subject.name}
                                     categoryCount={subject.categoriesCount} studentCount={subject.studentCount} />
                    ))
                }
            </Box>
        </>
    )
}
