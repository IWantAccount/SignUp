import {createFileRoute} from '@tanstack/react-router'
import {CreateSignForm} from "@/components/forms/create-sign-form.tsx";
import type {SignCreateDto} from "@/api/sign/sign-dtos.ts";

export const Route = createFileRoute('/app/signs/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CreateSignForm onSubmit={(dto: SignCreateDto) => {console.log(dto)}} submitButtonText={"neco"} disableSubmit={false}/>
}
