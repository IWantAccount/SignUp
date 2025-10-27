import { NameForm } from '@/components/forms/name-form'
import { createFileRoute } from '@tanstack/react-router'
import {
    createCreateCollectionOptions,
    privateCollectionQueryKey
} from "@/api/private-collection/private-collection-query-options.ts";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";

export const Route = createFileRoute('/app/private-collections/create')({
  component: RouteComponent,
})

function RouteComponent() {

    const {mutation, SnackBarComponent} = useMutationWithSnackBar([privateCollectionQueryKey], createCreateCollectionOptions(), "Kolekce vytvořena")


    return (
        <>
            <NameForm   header={"Vytvořit soukromou kolekci"}
                        onSubmit={
                            (data) => {
                                //TODO fix. Zatím nemáme "přihlášeného uživatele"
                                mutation.mutate({name: data.name, ownerId: "442bfc1c-15d7-44c0-ae4a-e7e443d52fbf"})
                            }
                        }
                        submitButtonText={"Uložit"}
                        submitButtonDisabled={mutation.isPending}/>

            {SnackBarComponent}
        </>
        )
}
