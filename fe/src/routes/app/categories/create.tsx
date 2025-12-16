import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {CategoryForm} from "@/components/forms/category-form.tsx";
import {Box, Typography} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCreateCategoryOptions} from "@/api/category/category-query-options.ts";
import type {CategoryCreateDto} from "@/api/category/category-dtos.ts";

export const Route = createFileRoute('/app/categories/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(createCreateCategoryOptions(queryClient, navigate))
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center"}}>
            <Typography variant="h5">Vytvořit novou kategorii</Typography>
            <CategoryForm onSubmit={
                (data: CategoryCreateDto) => mutation.mutate(data)
            } submitButtonText={
                mutation.isPending ? "Čekejte" : "Uložit"
            }
                          disableSubmit={mutation.isPending}/>
        </Box>
    )
}
