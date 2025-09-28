import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/users/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/users/create"!</div>
}
