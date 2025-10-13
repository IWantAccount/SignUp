import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/sign-components/$componentId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/sign-components/$componentId/edit"!</div>
}
