import {SignComponentForm} from '@/components/forms/sign-component-form';
import {createFileRoute} from '@tanstack/react-router'
import {
    createGetSignComponentByIdOptions, createUpdateSignComponentOptions,
} from "@/api/sign-component/sign-component-query-options.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";

export const Route = createFileRoute('/app/sign-components/$componentId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const componentId = Route.useParams().componentId;
    const query = useQuery(createGetSignComponentByIdOptions(componentId))
    const mutation = useMutation(createUpdateSignComponentOptions(componentId, queryClient));

    if (query.isPending) return <BackdropLoading/>;
    if (query.isError) return <></>;

    return (
        <SignComponentForm header={"Upravit komponentu"}
                           defaultDescription={query.data.textDescription}
                           defaultType={query.data.type}
                           onSubmit={
                               (data) => {
                                   mutation.mutate(data);
                               }
                           }
                           submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                           submitButtonDisabled={mutation.isPending}
                           renderType={false}/>
    )
}
