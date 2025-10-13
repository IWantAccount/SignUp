import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/private-collections/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/private-collections/create"!</div>
}
