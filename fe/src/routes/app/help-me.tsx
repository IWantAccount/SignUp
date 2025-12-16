import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/help-me')({
  component: RouteComponent,
})

function RouteComponent() {
  return <p>Tady bude výčet features a stručný návod, jak je používat</p>
}
