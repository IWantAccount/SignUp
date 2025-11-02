import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/app/sign-components/$componentId/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/app/sign-components/$componentId/"!</div>
}
