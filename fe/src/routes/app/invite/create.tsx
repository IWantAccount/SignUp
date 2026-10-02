import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCreateInviteOptions} from "@/api/invite/invite-query-options.ts";
import {CreateInviteForm} from "@/components/forms/create-invite-form.tsx";
import {Stack} from "@mui/material";

export const Route = createFileRoute('/app/invite/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(createCreateInviteOptions(queryClient, navigate));
  return (
      <Stack sx={{m: 2, gap: 2, alignItems: "center"}}>
        <CreateInviteForm onSubmit={(data) => mutation.mutate(data)}
                          submitButtonDisabled={mutation.isPending}/>
      </Stack>
  )
}
