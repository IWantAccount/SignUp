import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    createUser,
    deleteUser, getStudentEnrolledInSubject, getUserByClassroomAndNamePaged,
    getUserByClassroomPaged,
    getUserById,
    getUserPaged,
    updateUser
} from "@/api/user/user-api.ts";
import type {
    StudentInSubjectDto,
    UserCreateDto,
    UserGetDetailDto,
    UserGetListDto,
    UserUpdateDto
} from "@/api/user/user-dtos.ts";
import type {AxiosError} from "axios";
import type {Page} from "@/api/universal/dto/spring-boot-page.ts";

export const userQueryKey = "user";

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

export function createGetUserByClassroomInfiniteQueryOptions(classroomId: string, searchItem?: string) {
    return infiniteQueryOptions({
        queryKey: [userQueryKey, "infinite", classroomId, searchItem ? searchItem : ""],
        queryFn: ({pageParam}) => {
            if(!searchItem || searchItem === ""){
                return getUserByClassroomPaged(classroomId, pageParam);
            }

            return getUserByClassroomAndNamePaged(classroomId, searchItem, pageParam);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<UserGetListDto>) => {
            const next = lastPage.number + 1;
            return next < lastPage.totalPages ? next : undefined;
        }
    })
}

export function createGetEnrolledByNameInfiniteQueryOptions(subjectId: string, searchItem?: string) {
    const toSearch = searchItem ? searchItem : "";
    return infiniteQueryOptions({
        queryKey: [userQueryKey, "infinite", subjectId, toSearch],
        queryFn: ({pageParam}) => {
            return getStudentEnrolledInSubject(toSearch, subjectId, pageParam)
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<StudentInSubjectDto>) => {
            const next = lastPage.number + 1;
            return next < lastPage.totalPages ? next : undefined;
        },
    })
}