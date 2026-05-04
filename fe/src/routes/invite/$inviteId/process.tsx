import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createGetInviteByIdOptions, createProcessInviteOptions} from "@/api/invite/invite-query-options.ts";
import type {InviteGetDetailDto} from "@/api/invite/invite-dtos.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {ProcessInviteForm} from "@/components/forms/process-invite-form.tsx";
import {userRoleToCzech} from "@/domain/user-role-enum.ts";

export const Route = createFileRoute('/invite/$inviteId/process')({
  component: RouteComponent,
})



function RouteComponent() {
  const inviteId = Route.useParams().inviteId;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(createProcessInviteOptions(queryClient, navigate));
  const inviteQuery = useQuery(createGetInviteByIdOptions(inviteId));

  if (inviteQuery.isPending) return <BackdropLoading/>;
  if (inviteQuery.isError) return <></>;

  const inviteDto: InviteGetDetailDto = inviteQuery.data;

  return (
      <ProcessInviteForm
          onSubmit={(data) => mutation.mutate({id: inviteId, dto: data})}
          submitButtonDisabled={mutation.isPending}
          header={"Registrujete se jako " + userRoleToCzech(inviteDto.role)}/>
  )
}
