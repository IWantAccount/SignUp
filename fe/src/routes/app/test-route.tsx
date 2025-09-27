import { createFileRoute } from '@tanstack/react-router'
import {SearchableCardSectionTopBar} from "@/components/bars/searchable-card-section-top-bar.tsx";
export const Route = createFileRoute('/app/test-route')({
  component: RouteComponent,
})



function RouteComponent() {
  return <SearchableCardSectionTopBar
      title={"Pokus"}
      onEditNavigate={
        () => {console.log("navigujeme na editaci")}
      }
      onDelete={
        () => {console.log("mažeme")}
      }
      onSearch={
        (value) => {console.log("hledáme: " + value)}
      }/>
}
