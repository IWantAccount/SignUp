import { createFileRoute } from '@tanstack/react-router'
import {useState} from "react";
import {AddStudentToSubjectDialog} from "@/components/dialogs/add-student-to-subject-dialog.tsx";
import { Button } from '@mui/material';
import {AddStudentToClassRoomDialog} from "@/components/dialogs/add-student-to-classroom-dialog.tsx";

export const Route = createFileRoute('/app/debug/enrolled')({
  component: RouteComponent,
})

function RouteComponent() {
    const [subjectDialogOpened, setSubjectDialogOpened] = useState(false);
    const [classroomDialogOpened, setClassroomDialogOpened] = useState(false);
    const subjectId = "c1031096-60d6-4ae2-a552-dfd7abe8514c";

    return (
        <>
            <Button onClick={() => {setSubjectDialogOpened(true)}}>{"Otevřít dialog pro předmět"}</Button>
            <AddStudentToSubjectDialog subjectId={subjectId} open={subjectDialogOpened} onClose={() => setSubjectDialogOpened(false)}/>

            <Button onClick={() => setClassroomDialogOpened(true)}>{"Otevřít dialog pro třídy"}</Button>
            <AddStudentToClassRoomDialog classroomId={"5b9c89e2-1b5a-4d51-bed0-f8145c3e8397"} open={classroomDialogOpened} onClose={() => setClassroomDialogOpened(false)}/>
        </>
    )
}
