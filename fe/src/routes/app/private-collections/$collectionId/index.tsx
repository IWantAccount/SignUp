import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import { SignGrid } from '@/components/grids/sign-grid';
import {useMutation, useSuspenseQuery} from "@tanstack/react-query";
import {createGetCollectionByIdOptions} from "@/api/private-collection/private-collection-query-options.ts";
import { deleteCollectionById } from '@/api/private-collection/private-collection-api';

export const Route = createFileRoute('/app/private-collections/$collectionId/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
    const collectionId = Route.useParams().collectionId;
    const navigate = useNavigate()

    const {
        data,
        isLoading,
        isError,
    } = useSuspenseQuery(createGetCollectionByIdOptions(collectionId))
    if (isLoading) return <div>Načítám kolekci...</div>;
    if (isError) return <div>Chyba při načítání!</div>;

    const mutation = useMutation({
        mutationFn: (id: string) => deleteCollectionById(collectionId),
        onSuccess: () => {
            navigate({
                to: "/app/private-collections",
            })
        }
    })
  return (
        <>
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions
                    title={
                        data.name
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
                            mutation.mutate(collectionId)
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
        </>
  )
}
