import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/invite/$inviteId/process')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/invite/$inviteId/process"!</div>
}
