import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query"
import {
    createCollection,
    deleteCollectionById,
    getCollectionById, getCollectionByNamePaged,
    getCollectionPaged,
    updateCollectionById
} from "@/api/private-collection/private-collection-api.ts";
import type {
    PrivateCollectionCreateDto,
    PrivateCollectionGetDetailDto,
    PrivateCollectionUpdateDto
} from "@/api/private-collection/private-collection-dtos.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";

export const privateCollectionQueryKey = "private-collection";

export function createGetCollectionByIdOptions(id: string) {
    return queryOptions({
        queryKey: [privateCollectionQueryKey, id],
        queryFn: () => getCollectionById(id)
    })
}

export function createUpdateCollectionByIdOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    PrivateCollectionGetDetailDto,
    Error,
    PrivateCollectionUpdateDto> {
    return {
        mutationFn: (dto) => updateCollectionById(id, dto),
        mutationKey: [privateCollectionQueryKey, id],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]});
        }
    }
}

export function createCreateCollectionOptions(queryClient: QueryClient): UseMutationOptions<
    PrivateCollectionGetDetailDto,
    Error,
    PrivateCollectionCreateDto> {
    return {
        mutationFn: (dto) => createCollection(dto),
        mutationKey: [privateCollectionQueryKey],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]});
        }

    }
}

export function createCollectionInfiniteQueryOptions(searchItem?: string) {
    return infiniteQueryOptions({
        queryKey: [privateCollectionQueryKey, "infinite", searchItem ?? ""],
        queryFn: ({pageParam}) => searchItem ? getCollectionByNamePaged(searchItem, pageParam) : getCollectionPaged(pageParam),
        ...springInfiniteBase
    })
}

export function createDeleteCollectionByIdOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, string> {
    return {
        mutationKey: [privateCollectionQueryKey, id],
        mutationFn: (id: string) => deleteCollectionById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]})
        }
    }
}
