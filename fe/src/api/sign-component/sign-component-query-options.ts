import {
    infiniteQueryOptions,
    type QueryClient,
    queryOptions,
    type UseMutationOptions
} from "@tanstack/react-query";
import {
    createSignComponent, deleteSignComponent,
    getSignComponentById, getSignComponentPaged,
    updateSignComponent
} from "@/api/sign-component/sign-component-api.ts";
import type {
    SignComponentCreateDto,
    SignComponentGetDetailDto, SignComponentGetListDto,
    SignComponentUpdateDto
} from "@/api/sign-component/sign-component-dtos.ts";
import type { Page } from "../universal/dto/spring-boot-page";

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
            queryClient.invalidateQueries({queryKey: [signComponentQueryKey]})
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
            queryClient.invalidateQueries({queryKey: [signComponentQueryKey, id]})
        }
    }
}

export function createDeleteSignComponentOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, string> {
    return {
        mutationKey: [signComponentQueryKey, id],
        mutationFn: (id: string) => deleteSignComponent(id),
        onSuccess: (_data, id: string) => {
            queryClient.invalidateQueries({queryKey: [signComponentQueryKey]})
        }
    }
}

export function createSignComponentInfiniteQueryOptions() {
    return infiniteQueryOptions({
        queryKey: [signComponentQueryKey, "infinite"],
        queryFn: ({pageParam}) => getSignComponentPaged(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<SignComponentGetListDto>) => {
            const next = lastPage.number + 1;
            return next < lastPage.totalPages ? next : undefined;
        }
    })
}