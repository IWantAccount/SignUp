import {
    infiniteQueryOptions,
    mutationOptions,
    type QueryClient,
    queryOptions,
    type UseMutationOptions
} from "@tanstack/react-query";
import type {SearchSignDto, SignCreateDto, SignGetDetailDto, SignUpdateDto} from "@/api/sign/sign-dtos.ts";
import type {AxiosError} from "axios";
import {
    createSign, deleteSign,
    getSignById, getSignSearch, updateSign
} from "@/api/sign/sign-api.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import {categoryQueryKey} from "@/api/category/category-query-options.ts";
import type {useNavigate} from "@tanstack/react-router";

export const signQueryKey = "sign";
export function createCreateSignOptions(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    SignGetDetailDto,
    AxiosError,
    CreateSign> {
    return {
        mutationKey: [signQueryKey, "create"],
        mutationFn: (vars: CreateSign) => createSign(vars.dto, vars.video),
        onSuccess: async (data: SignGetDetailDto) => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [signQueryKey]}),
                navigate({
                    to: `/app/signs/${data.id}`
                })
            ])
        }
    }
}

export function createUpdateSignOptions(id: string, queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    SignGetDetailDto,
    AxiosError,
    SignUpdateDto> {
    return {
        mutationKey: [signQueryKey, "update"],
        mutationFn: (dto: SignUpdateDto)=> updateSign(id, dto),
        onSuccess: async (data: SignGetDetailDto) => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [signQueryKey]}),
                navigate({
                    to: `/app/signs/${data.id}`
                })
            ])
        }
    }
}

export function createGetSignByIdOptions(id: string) {
    return queryOptions({
        queryKey: [signQueryKey, id],
        queryFn: () => getSignById(id),
    })
}

export function createSignInfiniteSearch(dto: SearchSignDto, pageSize?: number) {
    return infiniteQueryOptions({
        queryKey: [signQueryKey, "infinite", dto],
        queryFn: ({pageParam}) => getSignSearch(
            {page: pageParam, dto: dto, pageSize: pageSize}
        ),
        ...springInfiniteBase
    })
}

export function createDeleteSignOptions(id: string, queryClient: QueryClient) {
    return mutationOptions({
        mutationKey: [signQueryKey, id],
        mutationFn: () => deleteSign(id),
        onSuccess: async () => {
            await Promise.all(
                [
                    queryClient.invalidateQueries({queryKey: [signQueryKey]}),
                    queryClient.invalidateQueries({queryKey: [categoryQueryKey]})
                ]
            )
        }
    })
}

interface CreateSign {
    dto: SignCreateDto;
    video: File;
}