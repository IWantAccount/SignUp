import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/subjects/$subjectId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/subjects/$subjectId/edit"!</div>
}
