import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/categories/$categoryId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/categories/$categoryId/edit"!</div>
}
