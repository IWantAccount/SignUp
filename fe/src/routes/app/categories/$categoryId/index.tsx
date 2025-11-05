import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SignGrid} from "@/components/grids/sign-grid.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    categoryQueryKey,
    createGetCategoryByIdOptions
} from "@/api/category/category-query-options.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import { deleteCategory } from '@/api/category/category-api';
import {queryClient} from "@/main.tsx";

export const Route = createFileRoute('/app/categories/$categoryId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const {categoryId} = Route.useParams()

    const categoryQuery = useQuery(createGetCategoryByIdOptions(categoryId));
    const deleteMutation = useMutation(
        {
            mutationFn: () => deleteCategory(categoryId),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [categoryQueryKey]})
                navigate({
                    to: "/app/categories",
                })
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
