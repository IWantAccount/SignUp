import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import type {SearchSignDto, SignCreateDto, SignGetDetailDto} from "@/api/sign/sign-dtos.ts";
import type {AxiosError} from "axios";
import {
    createSign,
    getSignById, getSignSearch
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

export function createSignInfiniteSearch(dto: SearchSignDto, pageSize?: number) {
    return infiniteQueryOptions({
        queryKey: [signQueryKey, "infinite", dto],
        queryFn: ({pageParam}) => getSignSearch(
            {page: pageParam, dto: dto, pageSize: pageSize}
        ),
        ...springInfiniteBase
    })
}

interface CreateSign {
    dto: SignCreateDto;
    video: File;
}