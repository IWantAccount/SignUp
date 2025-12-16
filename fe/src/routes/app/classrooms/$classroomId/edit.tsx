import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createGetClassroomByIdOptions,
    createUpdateClassroomOptions
} from "@/api/classroom/classroom-query-options.ts";
import {ErrorAlert} from "@/components/util/error-alert.tsx";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";

export const Route = createFileRoute('/app/classrooms/$classroomId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const classroomId = Route.useParams().classroomId;
    const query = useQuery(createGetClassroomByIdOptions(classroomId));
    const navigate = useNavigate();
    const mutation = useMutation(createUpdateClassroomOptions(classroomId, queryClient, navigate))

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
        </>
    )
}
