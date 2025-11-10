import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    addStudentToClassroom,
    createUser,
    deleteUser, getUserByRoleByName, getStudentEnrolledInSubject, getUserByClassroomAndNamePaged,
    getUserByClassroomPaged,
    getUserById,
    getUserPaged, removeStudentFromClassroom,
    updateUser, getUserBySubjectAndNamePaged
} from "@/api/user/user-api.ts";
import type {
    StudentClassroomDto,
    UserCreateDto,
    UserGetDetailDto,
    UserUpdateDto
} from "@/api/user/user-dtos.ts";
import type {AxiosError} from "axios";
import {queryClient} from "@/main.tsx";
import {classroomQueryKey} from "@/api/classroom/classroom-query-options.ts";
import type {UserRoleEnum} from "@/domain/user-role-enum.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";

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
        ...springInfiniteBase
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
        ...springInfiniteBase
    })
}

export function createGetUserBySubjectInfiniteQueryOptions(subjectId: string, searchItem?: string) {
    const search = searchItem ? searchItem : "";
    return infiniteQueryOptions({
        queryKey: [userQueryKey, subjectId, search, "infinite"],
        queryFn: ({pageParam}) => {
            return getUserBySubjectAndNamePaged(subjectId, pageParam, search);
        },
        ...springInfiniteBase
    })
}

export function createGetEnrolledByNameInfiniteQueryOptions(subjectId: string, searchItem?: string) {
    const toSearch = searchItem ? searchItem : "";
    return infiniteQueryOptions({
        queryKey: [userQueryKey, "infinite", subjectId, toSearch],
        queryFn: ({pageParam}) => {
            return getStudentEnrolledInSubject(toSearch, subjectId, pageParam)
        },
        ...springInfiniteBase
    })
}

export function createGetByRoleNameInfiniteQueryOptions(role: UserRoleEnum, name?: string) {
    return infiniteQueryOptions({
        queryKey: [userQueryKey, "infinite", role, name ?? ""],
        queryFn: ({pageParam}) => {
            return getUserByRoleByName(role, pageParam, name);
        },
        ...springInfiniteBase
    })
}

export function createAddStudentToClassroomOptions(dto: StudentClassroomDto): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [userQueryKey, dto.studentId, dto.classroomId],
        mutationFn: () => addStudentToClassroom(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [userQueryKey]});
            queryClient.invalidateQueries({queryKey: [classroomQueryKey]})
        }
    }
}

export function createRemoveStudentFromClassroomOptions(dto: StudentClassroomDto): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [userQueryKey, dto.studentId, dto.classroomId],
        mutationFn: () => removeStudentFromClassroom(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [userQueryKey]});
            queryClient.invalidateQueries({queryKey: [classroomQueryKey]})
        }
    }
}