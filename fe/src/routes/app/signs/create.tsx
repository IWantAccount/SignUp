import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/signs/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/signs/create"!</div>
}
