import {createFileRoute, Outlet} from '@tanstack/react-router'
import {TopBar} from "@/components/bars/top-bar.tsx";

export const Route = createFileRoute('/app')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <TopBar/>
        <Outlet/>
    </>
}
