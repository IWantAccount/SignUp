import {SignComponentForm} from '@/components/forms/sign-component-form'
import {createFileRoute} from '@tanstack/react-router'
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";
import {
    createCreateSignComponentOptions,
    signComponentQueryKey
} from "@/api/sign-component/sign-component-query-options.ts";
import {useQueryClient} from "@tanstack/react-query";

export const Route = createFileRoute('/app/sign-components/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const {
        mutation,
        SnackBarComponent
    } = useMutationWithSnackBar([signComponentQueryKey], createCreateSignComponentOptions(queryClient), "Komponenta znaku vytvořena");

    return (
        <>
            <SignComponentForm header={"Vytvořit komponentu znaku"}
                               onSubmit={
                                   (data) => {
                                       mutation.mutate(data)
                                   }
                               }
                               submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                               submitButtonDisabled={mutation.isPending}
                               renderType={true}/>
            {SnackBarComponent}
        </>
    )
}
