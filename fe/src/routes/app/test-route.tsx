import {createFileRoute} from '@tanstack/react-router'
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";

export const Route = createFileRoute('/app/test-route')({
    component: RouteComponent,
})


function RouteComponent() {
    return <SearchableCardSectionTopBarActions
        title={"Pokus"}
        onEditNavigate={
            () => {
                console.log("navigujeme na editaci")
            }
        }
        onDelete={
            () => {
                console.log("mažeme")
            }
        }
        onSearch={
            (value) => {
                console.log("hledáme: " + value)
            }
        }/>
}
