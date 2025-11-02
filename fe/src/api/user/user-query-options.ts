import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {createUser, deleteUser, getUserById, getUserPaged, updateUser} from "@/api/user/user-api.ts";
import type {UserCreateDto, UserGetDetailDto, UserUpdateDto} from "@/api/user/user-dtos.ts";
import type {AxiosError} from "axios";
import type {Page} from "@/api/universal/dto/spring-boot-page.ts";

const userQueryKey = "user";

export function createGetUserByIdOptions(id: string) {
    return queryOptions({
        queryKey: [userQueryKey, id],
        queryFn: () => getUserById(id)
    })
}

export function createCreateUserOptions(queryClient: QueryClient): UseMutationOptions<
    UserGetDetailDto,
    AxiosError,
    UserCreateDto> {
    return {
        mutationFn: (dto: UserCreateDto) => createUser(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [userQueryKey]});
        }
    }
}

export function createUpdateUserOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    UserGetDetailDto,
    AxiosError,
    UserUpdateDto> {
    return {
        mutationFn: (dto: UserUpdateDto) => updateUser(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [userQueryKey]});
        }
    }
}

export function createDeleteUserOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    void,
    AxiosError,
    string> {
    return {
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [userQueryKey]});
        }
    }
}

export function createUserInfiniteQueryOptions() {
    return infiniteQueryOptions({
        queryKey: [userQueryKey, "infinite"],
        queryFn: ({pageParam}) => getUserPaged(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<UserGetDetailDto>) => {
            const next = lastPage.number + 1;
            return next < lastPage.totalPages ? next : undefined;
        }
    })
}