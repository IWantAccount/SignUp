import {NameForm} from '@/components/forms/name-form'
import {createFileRoute} from '@tanstack/react-router'
import {
    createCreateCollectionOptions,
} from "@/api/private-collection/private-collection-query-options.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const Route = createFileRoute('/app/private-collections/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();

    const mutation = useMutation(createCreateCollectionOptions(queryClient));


    return (
        <NameForm header={"Vytvořit soukromou kolekci"}
                  onSubmit={
                      (data) => {
                          //TODO fix. Zatím nemáme "přihlášeného uživatele"
                          mutation.mutate({name: data.name, ownerId: "bb9499ac-2cbb-4c32-9122-e621a46992fd"})
                      }
                  }
                  submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                  submitButtonDisabled={mutation.isPending}/>
    )
}
