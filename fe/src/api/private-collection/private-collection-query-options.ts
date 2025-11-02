import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query"
import {
    createCollection, deleteCollectionById,
    getCollectionById, getCollectionPaged,
    updateCollectionById
} from "@/api/private-collection/private-collection-api.ts";
import type {
    PrivateCollectionCreateDto,
    PrivateCollectionGetDetailDto, PrivateCollectionGetListDto,
    PrivateCollectionUpdateDto
} from "@/api/private-collection/private-collection-dtos.ts";
import type { Page } from "../universal/dto/spring-boot-page";

export const privateCollectionQueryKey = "private-collection";

export function createGetCollectionByIdOptions(id: string) {
    return queryOptions({
        queryKey: [privateCollectionQueryKey, id],
        queryFn: () => getCollectionById(id)
    })
}

export function createUpdateCollectionByIdOptions(id:string, queryClient: QueryClient): UseMutationOptions<
    PrivateCollectionGetDetailDto,
    Error,
    PrivateCollectionUpdateDto> {
    return {
        mutationFn: (dto) => updateCollectionById(id, dto),
        mutationKey: [privateCollectionQueryKey, id],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]})
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
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]})
        }
    }
}

export function createCollectionInfiniteQueryOptions() {
    return infiniteQueryOptions({
        queryKey: [privateCollectionQueryKey, "infinite"],
        queryFn: ({pageParam}) => getCollectionPaged(pageParam, 2),
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<PrivateCollectionGetListDto>)=> {
            const next = lastPage.number + 1;
            return next < lastPage.totalPages ? next : undefined
        }
    })
}
export function createDeleteCollectionByIdOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, string> {
    return {
        mutationKey: [privateCollectionQueryKey, id],
        mutationFn: (id: string) =>deleteCollectionById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]})
        }
    }
}
