import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {
    createGetCollectionByIdOptions, createUpdateCollectionByIdOptions, privateCollectionQueryKey
} from "@/api/private-collection/private-collection-query-options.ts";

import { useMutationWithSnackBar } from '@/api/universal/hooks/use-mutation-snack-bar';

export const Route = createFileRoute(
  '/app/private-collections/$collectionId/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
    const collectionId = Route.useParams().collectionId;

    const {
      data,
      isLoading,
      isError,
    } = useSuspenseQuery(createGetCollectionByIdOptions(collectionId))

    const {mutation, SnackBarComponent} = useMutationWithSnackBar([privateCollectionQueryKey, collectionId], createUpdateCollectionByIdOptions(collectionId), "Kolekce přejmenována")

    if (isLoading) return <div>Načítám kolekci...</div>;
    if (isError) return <div>Chyba při načítání!</div>;
    const name = data.name;
  return (
      <>
          <NameForm defaultName={name}
                    header={"Přejmenovat soukromou kolekci"}
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
