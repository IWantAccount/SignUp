import {createFileRoute} from '@tanstack/react-router'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createGetUserByIdOptions, createUpdateUserOptions} from '@/api/user/user-query-options';
import {UserForm} from "@/components/forms/user-form.tsx";
import { BackdropLoading } from '@/components/util/backdrop-loading';
import type {UserGetDetailDto} from "@/api/user/user-dtos.ts";

export const Route = createFileRoute('/app/users/$userId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const userId = Route.useParams().userId;
    const mutation = useMutation(createUpdateUserOptions(userId, queryClient));
    const query = useQuery(createGetUserByIdOptions(userId))

    if(query.isPending) return <BackdropLoading/>
    if(query.isError) return <></>
    const user: UserGetDetailDto = query.data;

    return (
        <UserForm onSubmit={
            (data) => {
                mutation.mutate(data);
            }
        }
                  header={"Upravit uživatele"}
                  submitButtonText={mutation.isPending ? "Čekejte" : "Uložit"}
                  submitButtonDisabled={mutation.isPending}
                  renderPassword={false}
                    defaultName={user.name}
                    defaultEmail={user.email}
                    defaultRole={user.role}/>
    )
}
