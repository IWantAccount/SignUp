import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";

export const Route = createFileRoute('/app/subjects/$subjectId/')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const {subjectId} = Route.useParams()

    return (
        <TopBarItemsGrid>
          <SearchableCardSectionTopBarActions
              title={"Předmět s  id:" + subjectId}
              onSearch={
                (searchData) => {
                    //TODO funkční search
                    console.log(searchData)
                }}
              onDelete={
                () => {
                    //TODO api call
                  console.log("Mazání předmětu s id: " + subjectId)
                }
              }
              onEditNavigate={
                () => {
                    navigate({
                        to: '/app/subjects/$subjectId/edit',
                        params: {subjectId},
                    })
                }
              }
          />
          {/*TODO vhodný api call*/}
          <CategoryGrid list={[]}/>
        </TopBarItemsGrid>
    )
}
