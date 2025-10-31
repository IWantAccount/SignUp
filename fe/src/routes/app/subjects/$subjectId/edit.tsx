import {createFileRoute} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useQuery} from "@tanstack/react-query";
import {
    createGetSubjectByIdOptions,
    createUpdateSubjectOptions,
    subjectQueryKey
} from "@/api/subject/subject-query-options.ts";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {ErrorAlert} from "@/components/util/error-alert.tsx";

export const Route = createFileRoute('/app/subjects/$subjectId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const subjectId = Route.useParams().subjectId;

    const query = useQuery(createGetSubjectByIdOptions(subjectId));
    const {mutation, SnackBarComponent} = useMutationWithSnackBar(
        [subjectQueryKey, subjectId],
        createUpdateSubjectOptions(subjectId),
        "Povedlo se přejmenovat předmět"
    )

    if(query.isPending) return <BackdropLoading/>
    if(query.isError) return <ErrorAlert message={"Chyba při načítání předmětu"}/>

    return (
        <>
            <NameForm defaultName={query.data.name}
                      header={"Přejmenovat předmět"}
                      submitButtonText={mutation.isPending ? "Čekejte" : "Přejmenovat"}
                      submitButtonDisabled={mutation.isPending}
                      onSubmit={
                          (data) => {
                              mutation.mutate(data)
                          }
                      }/>
            {SnackBarComponent}
        </>
    )
}
