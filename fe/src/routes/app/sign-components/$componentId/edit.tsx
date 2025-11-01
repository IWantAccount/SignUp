import {SignComponentForm} from '@/components/forms/sign-component-form';
import {createFileRoute} from '@tanstack/react-router'
import {
    createGetSignComponentByIdOptions, createUpdateSignComponentOptions,
    signComponentQueryKey
} from "@/api/sign-component/sign-component-query-options.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {ErrorAlert} from "@/components/util/error-alert.tsx";

export const Route = createFileRoute('/app/sign-components/$componentId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const componentId = Route.useParams().componentId;
    const query = useQuery(createGetSignComponentByIdOptions(componentId))
    const {
        mutation,
        SnackBarComponent
    } = useMutationWithSnackBar([signComponentQueryKey, componentId], createUpdateSignComponentOptions(componentId, queryClient), "Komponenta upravena");

    if (query.isPending) return <BackdropLoading/>
    if (query.isError) return <ErrorAlert message={"Chyba při načítání komponenty"}/>

    return (<>
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
            {SnackBarComponent}
        </>
    )
}
