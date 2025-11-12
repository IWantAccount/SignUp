import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SignGrid} from '@/components/grids/sign-grid';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createGetCollectionByIdOptions,
    privateCollectionQueryKey
} from "@/api/private-collection/private-collection-query-options.ts";
import {deleteCollectionById} from '@/api/private-collection/private-collection-api';
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
export const Route = createFileRoute('/app/private-collections/$collectionId/')(
    {
        component: RouteComponent
    },
)

function RouteComponent() {
    const collectionId = Route.useParams().collectionId;
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => deleteCollectionById(collectionId),
        onSuccess: async () => {
            navigate({
                to: "/app/private-collections",
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]});
        }
    })

    const query = useQuery(createGetCollectionByIdOptions(collectionId))
    if (query.isPending) return <BackdropLoading/>;
    if(query.isError) return <></>;


    return (
        <>
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions
                    title={
                        query.data.name
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
                            mutation.mutate()
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
