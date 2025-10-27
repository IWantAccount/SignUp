import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {
    createGetSubjectByIdOptions,
    createUpdateSubjectOptions,
    subjectQueryKey
} from "@/api/subject/subject-query-options.ts";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";

export const Route = createFileRoute('/app/subjects/$subjectId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const subjectId = Route.useParams().subjectId;

  const {data} = useSuspenseQuery(createGetSubjectByIdOptions(subjectId));
  const {mutation, SnackBarComponent} = useMutationWithSnackBar(
      [subjectQueryKey, subjectId],
      createUpdateSubjectOptions(subjectId),
      "Povedlo se přejmenovat předmět"
  )

  return (
      <>
          <NameForm defaultName={data.name}
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
