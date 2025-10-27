import {queryOptions, type UseMutationOptions} from "@tanstack/react-query"
import {
    createCollection,
    getCollectionById,
    updateCollectionById
} from "@/api/private-collection/private-collection-api.ts";
import type {
    PrivateCollectionCreateDto,
    PrivateCollectionGetDetailDto,
    PrivateCollectionUpdateDto
} from "@/api/private-collection/private-collection-dtos.ts";

export const privateCollectionQueryKey = "private-collection";

export function createGetCollectionByIdOptions(id: string) {
    return queryOptions({
        queryKey: [privateCollectionQueryKey, id],
        queryFn: () => getCollectionById(id)
    })
}

export function createUpdateCollectionByIdOptions(id:string): UseMutationOptions<
    PrivateCollectionGetDetailDto,
    Error,
    PrivateCollectionUpdateDto> {
    return {
        mutationFn: (dto) => updateCollectionById(id, dto),
    }
}

export function createCreateCollectionOptions(): UseMutationOptions<
    PrivateCollectionGetDetailDto,
    Error,
    PrivateCollectionCreateDto> {
    return {
        mutationFn: (dto) => createCollection(dto)
    }
}