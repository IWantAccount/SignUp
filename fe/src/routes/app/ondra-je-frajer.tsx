import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/app/ondra-je-frajer')({
    component: RouteComponent,
})

function RouteComponent() {
    return <h1>TBD</h1>
}
