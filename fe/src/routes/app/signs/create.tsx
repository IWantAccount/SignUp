import {createFileRoute} from '@tanstack/react-router'
import {CreateSignForm} from "@/components/forms/create-sign-form.tsx";

export const Route = createFileRoute('/app/signs/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CreateSignForm/>
}
