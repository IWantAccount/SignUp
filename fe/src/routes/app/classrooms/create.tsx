import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";
import {createCreateClassroomOptions} from "@/api/classroom/classroom-query-options.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const Route = createFileRoute('/app/classrooms/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(createCreateClassroomOptions(queryClient, navigate))
    return (
        <NameForm header={"Založit třídu"}
                  onSubmit={
                      (data) => {
                          mutation.mutate(data)
                      }
                  }
                  submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                  submitButtonDisabled={mutation.isPending}/>
    )
}
