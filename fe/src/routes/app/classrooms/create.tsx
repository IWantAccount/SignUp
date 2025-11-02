import {createFileRoute} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";
import {classroomQueryKey, createCreateClassroomOptions} from "@/api/classroom/classroom-query-options.ts";
import {useQueryClient} from "@tanstack/react-query";

export const Route = createFileRoute('/app/classrooms/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const {
        mutation,
        SnackBarComponent
    } = useMutationWithSnackBar([classroomQueryKey], createCreateClassroomOptions(queryClient), "Třída založena")
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
