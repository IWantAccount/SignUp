import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import type {SignCreateDto, SignGetDetailDto} from "@/api/sign/sign-dtos.ts";
import type {AxiosError} from "axios";
import {
    createSign,
    getSignByCategorySearch,
    getSignById,
    getSignByPrivateCollectionSearch,
    getSignByTranslation
} from "@/api/sign/sign-api.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";

export const signQueryKey = "sign";
export function createCreateSignOptions(queryClient: QueryClient): UseMutationOptions<
    SignGetDetailDto,
    AxiosError,
    CreateSign> {
    return {
        mutationKey: [signQueryKey],
        mutationFn: (vars: CreateSign) => createSign(vars.dto, vars.video),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [signQueryKey]})
        }
    }
}

export function createGetSignByIdOptions(id: string) {
    return queryOptions({
        queryKey: [signQueryKey, id],
        queryFn: () => getSignById(id),
    })
}

export function createSignTranslationSearchInfiniteOptions(translation: string) {
    return infiniteQueryOptions({
        queryKey: [signQueryKey, translation],
        queryFn: ({pageParam}) => getSignByTranslation(translation, pageParam),
        ...springInfiniteBase
    })
}

export function createSignCategorySearchInfiniteOptions(categoryId: string, search?: string) {
    return infiniteQueryOptions({
        queryKey: [signQueryKey, categoryId, search ?? ""],
        queryFn: ({pageParam}) => getSignByCategorySearch(categoryId, pageParam,  search),
        ...springInfiniteBase
    })
}

export function createSignCollectionSearchInfiniteOptions(collectionId: string, search?: string) {
    return infiniteQueryOptions({
        queryKey: [signQueryKey, collectionId, search ?? ""],
        queryFn: ({pageParam}) => getSignByPrivateCollectionSearch(collectionId, pageParam, search),
        ...springInfiniteBase
    })
}

interface CreateSign {
    dto: SignCreateDto;
    video: File;
}