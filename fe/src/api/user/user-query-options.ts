import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    addStudentToClassroom,
    createUser,
    deleteUser, getStudentEnrolledInSubject,
    getUserById, removeStudentFromClassroom,
    updateUser, getUserSearch
} from "@/api/user/user-api.ts";
import type {
    StudentClassroomDto,
    UserCreateDto,
    UserGetDetailDto, UserSearchDto,
    UserUpdateDto
} from "@/api/user/user-dtos.ts";
import type {AxiosError} from "axios";
import {classroomQueryKey} from "@/api/classroom/classroom-query-options.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import type {useNavigate} from "@tanstack/react-router";

export const userQueryKey = "user";

export function createGetUserByIdOptions(id: string) {
    return queryOptions({
        queryKey: [userQueryKey, id],
        queryFn: () => getUserById(id)
    })
}

export function createCreateUserOptions(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    UserGetDetailDto,
    AxiosError,
    UserCreateDto> {
    return {
        mutationFn: (dto: UserCreateDto) => createUser(dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [userQueryKey]}),
                navigate({
                    to: `/app/users`
                })
            ])
        }
    }
}

export function createUpdateUserOptions(id: string, queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    UserGetDetailDto,
    AxiosError,
    UserUpdateDto> {
    return {
        mutationFn: (dto: UserUpdateDto) => updateUser(id, dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [userQueryKey]}),
                navigate({
                    to: `/app/users`
                })
            ])
        }
    }
}

export function createDeleteUserOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    void,
    AxiosError,
    string> {
    return {
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [userQueryKey]});
        }
    }
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

export function createUserSearchOptions(opt: {
    pageSize?: number;
    dto: UserSearchDto;
}) {
    return infiniteQueryOptions({
        queryKey: [userQueryKey, "infinite", opt.dto],
        queryFn: ({pageParam}) => getUserSearch({dto: opt.dto, page: pageParam, pageSize: opt.pageSize}),
        ...springInfiniteBase
    })
}

export function createAddStudentToClassroomOptions(dto: StudentClassroomDto, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [userQueryKey, dto.studentId, dto.classroomId],
        mutationFn: () => addStudentToClassroom(dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [userQueryKey]}),
                queryClient.invalidateQueries({queryKey: [classroomQueryKey]})
            ])
        }
    }
}

export function createRemoveStudentFromClassroomOptions(dto: StudentClassroomDto, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [userQueryKey, dto.studentId, dto.classroomId],
        mutationFn: () => removeStudentFromClassroom(dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [userQueryKey]}),
                queryClient.invalidateQueries({queryKey: [classroomQueryKey]})
            ])
        }
    }
}