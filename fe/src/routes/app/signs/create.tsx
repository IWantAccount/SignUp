import {createFileRoute} from '@tanstack/react-router'
import {CreateSignForm} from "@/components/forms/create-sign-form.tsx";
import type {SignCreateDto} from "@/api/sign/sign-dtos.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCreateSignOptions} from "@/api/sign/sign-query-options.ts";

export const Route = createFileRoute('/app/signs/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const createMutation = useMutation(createCreateSignOptions(queryClient));
    return <CreateSignForm
        onSubmit={(dto:SignCreateDto, video: File) => {createMutation.mutate({dto, video})}}
        submitButtonText={createMutation.isPending ? "Čekejte" : "Uložit"}
        disableSubmit={createMutation.isPending}/>
}
