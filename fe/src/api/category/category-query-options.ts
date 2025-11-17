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

export const categoryQueryKey = "category";

export function createGetCategoryByIdOptions(id: string) {
    return queryOptions({
        queryKey: [categoryQueryKey, id],
        queryFn: () => getCategoryById(id)
    })
}

export function createCreateCategoryOptions(queryClient: QueryClient): UseMutationOptions<CategoryGetDetailDto, AxiosError, CategoryCreateDto> {
    return {
        mutationFn: (dto: CategoryCreateDto) => createCategory(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [categoryQueryKey]});
        }
    }
}

export function createUpdateCategoryOptions(id: string, queryClient: QueryClient): UseMutationOptions<CategoryGetDetailDto, AxiosError, CategoryUpdateDto> {
    return {
        mutationFn: (dto: CategoryUpdateDto) => updateCategory(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [categoryQueryKey, id]});
        }
    }
}

export function createDeleteCategoryOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, AxiosError, string> {
    return {
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [categoryQueryKey, id]});
        }
    }
}

export function createCategoryInfiniteSearch(options: {searchName?: string, subjectId?: string}) {
    return infiniteQueryOptions({
        queryKey: [categoryQueryKey, "infinite", options.searchName ?? "", options.subjectId ?? ""],
        queryFn: ({pageParam}) => getCategorySearch({
            page: pageParam,searchName: options.searchName, subjectId: options.subjectId}),
        ...springInfiniteBase
    })
}