import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SignGrid} from "@/components/grids/sign-grid.tsx";

export const Route = createFileRoute('/app/categories/$categoryId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const {categoryId} = Route.useParams()

    return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions
                /*TODO nahradit*/
                title={"Kategorie s id " + ` ${categoryId}`}
                onSearch={
                    (searchItem: string) => {
                        //TODO funkční search
                    }
                }
                onEditNavigate={
                    () => {
                        navigate({
                            to: '/app/categories/$categoryId/edit',
                            params: {categoryId},
                        })
                    }
                }
                onDelete={
                    () => {/*TODO api call*/
                    }
                }

            />
            {/*TODO vhodný api call*/}
            <SignGrid list={[]}/>
        </TopBarItemsGrid>
    )
}
