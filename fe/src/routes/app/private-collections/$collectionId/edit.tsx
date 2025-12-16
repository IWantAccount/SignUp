import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createGetCollectionByIdOptions,
    createUpdateCollectionByIdOptions
} from "@/api/private-collection/private-collection-query-options.ts";

import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {ErrorAlert} from "@/components/util/error-alert.tsx";

export const Route = createFileRoute(
    '/app/private-collections/$collectionId/edit',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const collectionId = Route.useParams().collectionId;
    const queryClient = useQueryClient();

    const query = useQuery(createGetCollectionByIdOptions(collectionId))
    const navigate = useNavigate();
    const mutation = useMutation(createUpdateCollectionByIdOptions(collectionId, queryClient, navigate))

    if(query.isPending) return <BackdropLoading/>
    if(query.isError) return <ErrorAlert message={"Chyba při načítání kolekce"}/>

    const name = query.data.name;
    return (
        <NameForm defaultName={name}
                  header={"Přejmenovat soukromou kolekci"}
                  submitButtonText={mutation.isPending ? "Čekejte" : "Přejmenovat"}
                  submitButtonDisabled={mutation.isPending}
                  onSubmit={
                      (data) => {
                          mutation.mutate(data)
                      }
                  }/>

    )
}
