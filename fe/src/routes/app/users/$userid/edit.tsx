import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/users/$userid/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/users/$userid/edit"!</div>
}
