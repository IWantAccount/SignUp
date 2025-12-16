import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {createCreateUserOptions} from "@/api/user/user-query-options.ts";
import {UserForm} from "@/components/forms/user-form.tsx";

export const Route = createFileRoute('/app/users/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(createCreateUserOptions(queryClient, navigate))
    return (
        <UserForm onSubmit={
            (data) => {
                mutation.mutate(data);
            }
        }
                    header={"Vytvořit uživatele"}
                    submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                    submitButtonDisabled={mutation.isPending}
                    renderPassword={true}/>
    )
}
