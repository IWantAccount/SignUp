import {createFileRoute} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";
import {classroomQueryKey, createCreateClassroomOptions} from "@/api/classroom/classroom-query-options.ts";

export const Route = createFileRoute('/app/classrooms/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const {
        mutation,
        SnackBarComponent
    } = useMutationWithSnackBar([classroomQueryKey], createCreateClassroomOptions(), "Třída založena")
    return (
        <>
            <NameForm header={"Založit třídu"}
                      onSubmit={
                          (data) => {
                              mutation.mutate(data)
                          }
                      }
                      submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                      submitButtonDisabled={mutation.isPending}/>
            {SnackBarComponent}</>
    )
}
