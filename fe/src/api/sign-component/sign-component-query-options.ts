import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    createSignComponent,
    deleteSignComponent,
    getSignComponentById, getSignComponentSearch,
    updateSignComponent
} from "@/api/sign-component/sign-component-api.ts";
import type {
    SignComponentCreateDto,
    SignComponentGetDetailDto,
    SignComponentUpdateDto
} from "@/api/sign-component/sign-component-dtos.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import type {SignComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";
import type {useNavigate} from "@tanstack/react-router";

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
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [signComponentQueryKey]});
        }
    }
}

export function createUpdateSignComponentOptions(id: string, queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    SignComponentGetDetailDto,
    Error,
    SignComponentUpdateDto> {
    return {
        mutationKey: [signComponentQueryKey, id],
        mutationFn: (dto: SignComponentUpdateDto) => updateSignComponent(id, dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [signComponentQueryKey, id]}),
                navigate({
                    to: `/app/sign-components`
                })
            ])
        }
    }
}

export function createDeleteSignComponentOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, string> {
    return {
        mutationKey: [signComponentQueryKey, id],
        mutationFn: (id: string) => deleteSignComponent(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [signComponentQueryKey]});
        }
    }
}

/**
 * Create options for infiniteQuery. You can specify description and type to filter. Undefined is interpreted as any
 * */
export function createSignComponentSearch(opt: {description?: string, type?: SignComponentTypeEnum, pageSize?: number}) {
    return infiniteQueryOptions({
        queryKey: [signComponentQueryKey, "infinite", opt.description ?? "", opt.type],
        queryFn: ({pageParam}) => getSignComponentSearch({page: pageParam, ...opt}),
        ...springInfiniteBase
    })
}