import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/private-collections/$collectionId/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/private-collections/$collectionId/edit"!</div>
}
