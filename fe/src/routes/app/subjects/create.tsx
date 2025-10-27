import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {useMutationWithSnackBar} from "@/api/universal/hooks/use-mutation-snack-bar.tsx";
import {createCreateSubjectOptions, subjectQueryKey} from "@/api/subject/subject-query-options.ts";

export const Route = createFileRoute('/app/subjects/create')({
  component: RouteComponent,
})

function RouteComponent() {
    const {mutation, SnackBarComponent} = useMutationWithSnackBar([subjectQueryKey], createCreateSubjectOptions(), "Povedlo se založit předmět")
    return (
        <>
            <NameForm   header={"Vytvořit předmět"}
                        onSubmit={
                            (data) => {
                                mutation.mutate(data)
                            }
                        }
                        submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                        submitButtonDisabled={mutation.isPending}/>
            {SnackBarComponent}
        </>
    )
}
