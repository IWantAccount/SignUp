import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createGetSubjectByIdOptions,
    createUpdateSubjectOptions
} from "@/api/subject/subject-query-options.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {ErrorAlert} from "@/components/util/error-alert.tsx";

export const Route = createFileRoute('/app/subjects/$subjectId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const subjectId = Route.useParams().subjectId;
    const queryClient = useQueryClient();
    const query = useQuery(createGetSubjectByIdOptions(subjectId));
    const navigate = useNavigate();
    const mutation = useMutation(createUpdateSubjectOptions(subjectId, queryClient, navigate))

    if (query.isPending) return <BackdropLoading/>
    if (query.isError) return <ErrorAlert message={"Chyba při načítání předmětu"}/>

    return (
        <NameForm defaultName={query.data.name}
                  header={"Přejmenovat předmět"}
                  submitButtonText={mutation.isPending ? "Čekejte" : "Přejmenovat"}
                  submitButtonDisabled={mutation.isPending}
                  onSubmit={
                      (data) => {
                          mutation.mutate(data)
                      }
                  }/>
    )
}
