import { createFileRoute} from '@tanstack/react-router'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPasswordReqQueryOpt} from "@/api/password/password-query-options.ts";
import {RequestPasswordForm} from "@/components/forms/request-password-form.tsx";
import type {PasswordRequestDto} from "@/api/password/password-dtos.ts";

export const Route = createFileRoute('/password/request-new')({
  component: RouteComponent,
})

function RouteComponent() {

    const queryClient = useQueryClient();
    const mutation = useMutation(createPasswordReqQueryOpt(queryClient))


  return (
      <RequestPasswordForm
          onSubmit={(dto: PasswordRequestDto) => mutation.mutate(dto)}
          submitButtonText={
            mutation.isPending ? "Čekejte" : "Odeslat"
          }
          disableSubmit={mutation.isPending}/>
  )
}
