import {NameForm} from '@/components/forms/name-form'
import {createFileRoute} from '@tanstack/react-router'
import {
    createCreateCollectionOptions,
} from "@/api/private-collection/private-collection-query-options.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AuthService} from "@/api/util/auth-service.ts";

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
                          mutation.mutate({name: data.name, ownerId: AuthService.getUserId()})
                      }
                  }
                  submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                  submitButtonDisabled={mutation.isPending}/>
    )
}
