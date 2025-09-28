import { createFileRoute } from '@tanstack/react-router'
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";

export const Route = createFileRoute('/app/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <TopBarItemsGrid>
        <SearchableCardSectionTopBarActions
            title={"Všechny kategorie"}
            onSearch={
              //TODO funkční search
              (searchItem: string) => {}
            }/>
        {/*TODO po fetch vložit data*/}
        <CategoryGrid list={[]}/>
        {/*TODO stránky*/}
      </TopBarItemsGrid>
  )
}
