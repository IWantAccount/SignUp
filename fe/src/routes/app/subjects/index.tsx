import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/subjects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/subjects/"!</div>
}
