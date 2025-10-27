import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {createGetSubjectByIdOptions, subjectQueryKey} from "@/api/subject/subject-query-options.ts";
import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {deleteSubject} from "@/api/subject/subject-api.ts";

export const Route = createFileRoute('/app/subjects/$subjectId/')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const {subjectId} = Route.useParams()
    const {
        data,
        //isLoading,
        //isError
    } = useSuspenseQuery(createGetSubjectByIdOptions(subjectId))

    const deleteMutation = useMutation({
        mutationFn: () => deleteSubject(subjectId),
        onSuccess: () => {
            navigate({
                to: "/app/subjects",
            })
        }
    })

    const queryClient = useQueryClient();

    return (
        <TopBarItemsGrid>
          <SearchableCardSectionTopBarActions
              title={data.name}
              onSearch={
                (searchData) => {
                    //TODO funkční search
                    console.log(searchData)
                }}
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
          <CategoryGrid list={[]}/>
        </TopBarItemsGrid>
    )
}
