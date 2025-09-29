import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import { SignGrid } from '@/components/grids/sign-grid';

export const Route = createFileRoute('/app/private-collections/$collectionId/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
    const collectionId = Route.useParams().collectionId;
    const navigate = useNavigate()
  return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions
                title={
                    //TODO vzít z vhodného api callu, použít normální jméno
                    "Název kolekce"
                }
                onSearch={
                    (searchData) => {
                        //TODO funkční search
                        console.log(searchData)
                    }
                }
                onDelete={
                    //TODO api call
                    () => {
                        console.log("Mazání kolekce s id " + collectionId)
                    }
                }
                onEditNavigate={
                    () => {
                        navigate({
                            to: '/app/private-collections/$collectionId/edit',
                            params: {collectionId},
                        })
                    }
                }/>
            {/*TODO vhodný api call*/}
            <SignGrid list={[]}/>
        </TopBarItemsGrid>
  )
}
