import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/private-collections/$collectionId/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/app/private-collections/$collectionId/"!</div>
}
