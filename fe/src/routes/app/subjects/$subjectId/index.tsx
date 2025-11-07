import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {createGetSubjectByIdOptions, subjectQueryKey} from "@/api/subject/subject-query-options.ts";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteSubject} from "@/api/subject/subject-api.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {ErrorAlert} from "@/components/util/error-alert.tsx";
import {createCategoryInfiniteQuery} from "@/api/category/category-query-options.ts";
import {useState} from "react";

export const Route = createFileRoute('/app/subjects/$subjectId/')({
    component: RouteComponent,
    errorComponent: () => <ErrorAlert message={"Chyba při načítání předmětu"}/>,
    pendingComponent: () => <BackdropLoading/>,
})

function RouteComponent() {
    const navigate = useNavigate()
    const [searchItem, setSearchItem] =  useState<string>("");
    const {subjectId} = Route.useParams()
    const subjectQuery = useQuery(createGetSubjectByIdOptions(subjectId))
    const categoryQuery = useInfiniteQuery(createCategoryInfiniteQuery(searchItem, subjectId));

    const deleteMutation = useMutation({
        mutationFn: () => deleteSubject(subjectId),
        onSuccess: () => {
            navigate({
                to: "/app/subjects",
            })
        }
    })

    const queryClient = useQueryClient();

    if(subjectQuery.isPending || categoryQuery.isPending) return <BackdropLoading/>
    if(subjectQuery.isError || categoryQuery.isError) return <></>

    const categories = categoryQuery.data.pages.flatMap(page => page.content) || [];

    return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions
                title={subjectQuery.data.name}
                onSearch={
                    (value: string) => {
                        setSearchItem(value);
                    }
                }
                onDelete={
                    () => {
                        deleteMutation.mutate()
                        queryClient.invalidateQueries({queryKey: [subjectQueryKey, subjectId]})
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
            <CategoryGrid list={categories}/>
        </TopBarItemsGrid>
    )
}
