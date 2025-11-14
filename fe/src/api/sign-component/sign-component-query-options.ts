import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    createSignComponent,
    deleteSignComponent,
    getSignComponentById, getSignComponentByTypeAndDescriptionPaged,
    updateSignComponent
} from "@/api/sign-component/sign-component-api.ts";
import type {
    SignComponentCreateDto,
    SignComponentGetDetailDto,
    SignComponentUpdateDto
} from "@/api/sign-component/sign-component-dtos.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import type {SignComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";

export const signComponentQueryKey = "sign-component";

export function createGetSignComponentByIdOptions(id: string) {
    return queryOptions({
        queryKey: [signComponentQueryKey],
        queryFn: () => getSignComponentById(id)
    })
}

export function createCreateSignComponentOptions(queryClient: QueryClient): UseMutationOptions<
    SignComponentGetDetailDto,
    Error,
    SignComponentCreateDto> {
    return {
        mutationKey: [signComponentQueryKey],
        mutationFn: (dto: SignComponentCreateDto) => createSignComponent(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [signComponentQueryKey]});
        }
    }
}

export function createUpdateSignComponentOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    SignComponentGetDetailDto,
    Error,
    SignComponentUpdateDto> {
    return {
        mutationKey: [signComponentQueryKey, id],
        mutationFn: (dto: SignComponentUpdateDto) => updateSignComponent(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [signComponentQueryKey, id]});
        }
    }
}

export function createDeleteSignComponentOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, string> {
    return {
        mutationKey: [signComponentQueryKey, id],
        mutationFn: (id: string) => deleteSignComponent(id),
        onSuccess: (_data, id: string) => {
            queryClient.invalidateQueries({queryKey: [signComponentQueryKey]});
        }
    }
}

export function createSignComponentByTypeDescriptionInfiniteOptions(searchItem: string, type?: SignComponentTypeEnum) {
    return infiniteQueryOptions({
        queryKey: [signComponentQueryKey, "infinite", searchItem, type ?? ""],
        queryFn: ({pageParam}) => getSignComponentByTypeAndDescriptionPaged(searchItem, pageParam, type),
        ...springInfiniteBase
    })
}