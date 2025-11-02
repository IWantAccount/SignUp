import {createFileRoute} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
    classroomQueryKey,
    createGetClassroomByIdOptions,
    createUpdateClassroomOptions
} from "@/api/classroom/classroom-query-options.ts";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";
import {ErrorAlert} from "@/components/util/error-alert.tsx";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";

export const Route = createFileRoute('/app/classrooms/$classroomId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const classroomId = Route.useParams().classroomId;
    const query = useQuery(createGetClassroomByIdOptions(classroomId));
    const {
        mutation,
        SnackBarComponent
    } = useMutationWithSnackBar([classroomQueryKey], createUpdateClassroomOptions(classroomId, queryClient), "Povedlo se přejmenovat třídu")

    if (query.isPending) return <BackdropLoading/>
    if (query.isError) return <ErrorAlert message={"Chyba při načítání třídy"}/>

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
