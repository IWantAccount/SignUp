import {createFileRoute} from '@tanstack/react-router'
import {Box, Typography} from "@mui/material";
import {CategoryForm} from "@/components/forms/category-form.tsx";
import {createGetCategoryByIdOptions, createUpdateCategoryOptions} from "@/api/category/category-query-options.ts";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import type {CategoryUpdateDto} from "@/api/category/category-dtos.ts";

export const Route = createFileRoute('/app/categories/$categoryId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const categoryId = Route.useParams().categoryId;
    const queryClient = useQueryClient();
    const categoryQuery = useQuery(createGetCategoryByIdOptions(categoryId));
    const updateMutation = useMutation(createUpdateCategoryOptions(categoryId, queryClient));
    if (categoryQuery.isPending) return <BackdropLoading/>;
    if (categoryQuery.isError) return <></>;
    const category = categoryQuery.data;

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center"}}>
            <Typography variant="h5">Aktualizovat kategorii {}</Typography>
            <CategoryForm onSubmit={(data: CategoryUpdateDto) => updateMutation.mutate(data)}
                          submitButtonText={
                updateMutation.isPending ? "Čekejte" : "Aktualizovat"
            }
                          defaultName={category.name} defaultSubjectId={category.subjectNameId.id}
                          defaultSubjectName={category.subjectNameId.name}
                          disableSubmit={updateMutation.isPending}/>
        </Box>
    )
}
