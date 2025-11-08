import { createFileRoute } from '@tanstack/react-router'
import {useState} from "react";
import {AddStudentDialog} from "@/components/dialogs/add-student-dialog.tsx";
import { Button } from '@mui/material';

export const Route = createFileRoute('/app/debug/enrolled')({
  component: RouteComponent,
})

function RouteComponent() {
    const [dialogOpened, setDialogOpened] = useState(false);
    const subjectId = "c1031096-60d6-4ae2-a552-dfd7abe8514c";

    return (
        <>
            <Button onClick={() => {setDialogOpened(true)}}>{"Otevřít dialog"}</Button>
            <AddStudentDialog subjectId={subjectId} open={dialogOpened} onClose={() => setDialogOpened(false)}/>
        </>
    )
}
