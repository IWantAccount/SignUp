import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query"
import {
    addSignToCollection, collectionSignSearch,
    createCollection,
    deleteCollectionById,
    getCollectionById, getCollectionSearch, removeSignFromCollection,
    updateCollectionById
} from "@/api/private-collection/private-collection-api.ts";
import type {
    CollectionSearchDto,
    CollectionSignDto, CollectionSignSearchDto,
    PrivateCollectionCreateDto,
    PrivateCollectionGetDetailDto,
    PrivateCollectionUpdateDto
} from "@/api/private-collection/private-collection-dtos.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import type {AxiosError} from "axios";
import {signQueryKey} from "@/api/sign/sign-query-options.ts";

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
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]});
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]});
        }

    }
}

export function createCollectionSearchOptions(dto?: CollectionSearchDto, pageSize?: number){
    return infiniteQueryOptions({
        queryKey: [privateCollectionQueryKey, "infinite", dto],
        queryFn: ({pageParam}) => getCollectionSearch({dto: dto, page: pageParam, pageSize: pageSize}),
        ...springInfiniteBase
    })
}

export function createDeleteCollectionByIdOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, string> {
    return {
        mutationKey: [privateCollectionQueryKey, id],
        mutationFn: (id: string) => deleteCollectionById(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]})
        }
    }
}

export function createAddSignToCollectionOptions(dto: CollectionSignDto, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [privateCollectionQueryKey, dto],
        mutationFn: () => addSignToCollection(dto),
        onSuccess: async () => {
            await Promise.all(
                [
                    queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]}),
                    queryClient.invalidateQueries({queryKey: [signQueryKey, dto.signId]})
                ]
            )
        }
    }
}

export function createRemoveSignFromCollectionOptions(dto: CollectionSignDto, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [privateCollectionQueryKey, dto],
        mutationFn: () => removeSignFromCollection(dto),
        onSuccess: async () => {
            await Promise.all(
                [
                    queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]}),
                    queryClient.invalidateQueries({queryKey: [signQueryKey, dto.signId]})
                ]
            )
        }
    }
}

export function createCollectionSignSearch(dto: CollectionSignSearchDto, pageSize?: number) {
    return infiniteQueryOptions({
        queryKey: [privateCollectionQueryKey, dto],
        queryFn: ({pageParam}) => collectionSignSearch(dto, pageParam, pageSize),
        ...springInfiniteBase
    })
}


