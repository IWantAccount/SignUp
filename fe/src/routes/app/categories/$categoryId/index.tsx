import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SignGrid} from "@/components/grids/sign-grid.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    categoryQueryKey,
    createGetCategoryByIdOptions
} from "@/api/category/category-query-options.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import { deleteCategory } from '@/api/category/category-api';

export const Route = createFileRoute('/app/categories/$categoryId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const {categoryId} = Route.useParams();
    const queryClient = useQueryClient();

    const categoryQuery = useQuery(createGetCategoryByIdOptions(categoryId));
    const deleteMutation = useMutation(
        {
            mutationFn: () => deleteCategory(categoryId),
            onSuccess: async () => {
                navigate({
                    to: "/app/categories",
                })

                // Wait for a while. If queries are invalidated too quickly, category query might refetch and cause 404 error
                await new Promise(resolve => setTimeout(resolve, 1000));
                queryClient.invalidateQueries({queryKey: [categoryQueryKey]})
            }
        }
    );

    if(categoryQuery.isPending || deleteMutation.isPending) return <BackdropLoading/>
    if(categoryQuery.isError) return <></>

    return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions
                title={categoryQuery.data.name}
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
                    () => {
                        deleteMutation.mutate();
                    }
                }

            />
            {/*TODO vhodný api call*/}
            <SignGrid list={[]}/>
        </TopBarItemsGrid>
    )
}
