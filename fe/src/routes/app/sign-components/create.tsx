import {SignComponentForm} from '@/components/forms/sign-component-form'
import {createFileRoute} from '@tanstack/react-router'
import {
    createCreateSignComponentOptions
} from "@/api/sign-component/sign-component-query-options.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const Route = createFileRoute('/app/sign-components/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const mutation = useMutation(createCreateSignComponentOptions(queryClient));

    return (
        <SignComponentForm header={"Vytvořit komponentu znaku"}
                           onSubmit={
                               (data) => {
                                   mutation.mutate(data)
                               }
                           }
                           submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                           submitButtonDisabled={mutation.isPending}
                           renderType={true}/>
    )
}
