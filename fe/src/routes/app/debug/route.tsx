import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/app/debug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <div>DEBUG jen zkouším cards</div>
      <Outlet></Outlet>
  </>
}
