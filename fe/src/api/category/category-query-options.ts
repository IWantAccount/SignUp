import {infiniteQueryOptions, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    createCategory,
    deleteCategory,
    getCategoryById, getCategoryByNamePaged,
    getCategorySubjectSearchPaged,
    updateCategory
} from "@/api/category/category-api.ts";
import type {
    CategoryCreateDto,
    CategoryGetDetailDto,
    CategoryGetListDto,
    CategoryUpdateDto
} from "@/api/category/category-dtos.ts";
import type {AxiosError} from "axios";
import {queryClient} from "@/main.tsx";
import type { Page } from "../universal/dto/spring-boot-page";

export const categoryQueryKey = "category";

export function createGetCategoryByIdOptions(id: string) {
    return queryOptions({
        queryKey: [categoryQueryKey, id],
        queryFn: () => getCategoryById(id)
    })
}

export function createCreateCategoryOptions(): UseMutationOptions<CategoryGetDetailDto, AxiosError, CategoryCreateDto> {
    return {
        mutationFn: (dto: CategoryCreateDto) => createCategory(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [categoryQueryKey]});
        }
    }
}

export function createUpdateCategoryOptions(id: string): UseMutationOptions<CategoryGetDetailDto, AxiosError, CategoryUpdateDto> {
    return {
        mutationFn: (dto: CategoryUpdateDto) => updateCategory(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [categoryQueryKey, id]});
        }
    }
}

export function createDeleteCategoryOptions(id: string): UseMutationOptions<void, AxiosError, string> {
    return {
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [categoryQueryKey, id]});
        }
    }
}

export function createCategoryInfiniteQuery(searchItem: string, subjectId?: string) {
    return infiniteQueryOptions({
        queryKey: [categoryQueryKey, "infinite", searchItem ? searchItem : ""],
        queryFn: ({pageParam}) => {

            if(!subjectId){
                return getCategoryByNamePaged(pageParam, searchItem);
            }

            return getCategorySubjectSearchPaged(pageParam, searchItem, subjectId);

        },
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<CategoryGetListDto>) => {
            const nextPage = lastPage.number + 1;
            return nextPage < lastPage.totalPages ? nextPage : undefined;
        }
    })
}