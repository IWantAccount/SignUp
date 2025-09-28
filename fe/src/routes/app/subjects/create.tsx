import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/subjects/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/subjects/create"!</div>
}
