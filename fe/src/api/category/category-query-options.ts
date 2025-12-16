import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    createCategory,
    deleteCategory,
    getCategoryById, getCategorySearch,
    updateCategory
} from "@/api/category/category-api.ts";
import type {
    CategoryCreateDto,
    CategoryGetDetailDto,
    CategoryUpdateDto
} from "@/api/category/category-dtos.ts";
import type {AxiosError} from "axios";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import type {useNavigate} from "@tanstack/react-router";

export const categoryQueryKey = "category";

export function createGetCategoryByIdOptions(id: string) {
    return queryOptions({
        queryKey: [categoryQueryKey, id],
        queryFn: () => getCategoryById(id)
    })
}

export function createCreateCategoryOptions(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<CategoryGetDetailDto, AxiosError, CategoryCreateDto> {
    return {
        mutationFn: (dto: CategoryCreateDto) => createCategory(dto),
        onSuccess: async (data:CategoryGetDetailDto) => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [categoryQueryKey]}),
                navigate({
                    to: `/app/categories/${data.id}`
                })
            ])
        }
    }
}

export function createUpdateCategoryOptions(id: string, queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<CategoryGetDetailDto, AxiosError, CategoryUpdateDto> {
    return {
        mutationFn: (dto: CategoryUpdateDto) => updateCategory(id, dto),
        onSuccess: async (data: CategoryGetDetailDto) => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [categoryQueryKey]}),
                navigate({
                    to: `/app/categories/${data.id}`
                })
            ])
        }
    }
}

export function createDeleteCategoryOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationFn: () => deleteCategory(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [categoryQueryKey]});
        }
    }
}

export function createCategoryInfiniteSearch(options: {search?: string, subjectId?: string, pageSize?: number}) {
    return infiniteQueryOptions({
        queryKey: [categoryQueryKey, "infinite", options.search ?? "", options.subjectId ?? ""],
        queryFn: ({pageParam}) => getCategorySearch({
            page: pageParam,search: options.search, subjectId: options.subjectId, pageSize: options.pageSize}),
        ...springInfiniteBase
    })
}