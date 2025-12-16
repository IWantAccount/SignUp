import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {createCreateSubjectOptions} from "@/api/subject/subject-query-options.ts";
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const Route = createFileRoute('/app/subjects/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(createCreateSubjectOptions(queryClient, navigate))
    return (
        <NameForm header={"Vytvořit předmět"}
                  onSubmit={
                      (data) => {
                          mutation.mutate(data)
                      }
                  }
                  submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                  submitButtonDisabled={mutation.isPending}/>

    )
}
