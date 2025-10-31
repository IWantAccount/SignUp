import {createFileRoute} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {
    classroomQueryKey,
    createGetClassroomByIdOptions,
    createUpdateClassroomOptions
} from "@/api/classroom/classroom-query-options.ts";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";

export const Route = createFileRoute('/app/classrooms/$classroomId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const classroomId = Route.useParams().classroomId;
    const query = useSuspenseQuery(createGetClassroomByIdOptions(classroomId));
    const {
        mutation,
        SnackBarComponent
    } = useMutationWithSnackBar([classroomQueryKey], createUpdateClassroomOptions(classroomId), "Povedlo se přejmenovat třídu")
    return (
        <>

            <NameForm defaultName={query.data.name}
                      header={"Přejmenovat třídu"}
                      submitButtonText={mutation.isPending ? "Čekejte" : "Přejmenovat"}
                      onSubmit={
                          (data) => {
                              mutation.mutate(data)
                          }
                      }
                      submitButtonDisabled={mutation.isPending}/>
            {SnackBarComponent}
        </>
    )
}
