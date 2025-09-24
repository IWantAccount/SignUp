import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TopBar} from "@/components/top-bar";
export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <TopBar/>
    <Outlet />
  </>
}
