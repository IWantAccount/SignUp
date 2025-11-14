import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    addClassroomToSubject,
    addStudentToSubject,
    createSubject,
    deleteSubject,
    getSubjectById, getSubjectByNamePaged,
    getSubjectPaged,
    removeStudentFromSubject,
    updateSubject
} from "@/api/subject/subject-api.ts";
import type {
    SubjectClassroomDto,
    SubjectCreateDto,
    SubjectGetDetailDto,
    SubjectStudentDto,
    SubjectUpdateDto
} from "@/api/subject/subject-dtos.ts";
import type {AxiosError} from "axios";
import {userQueryKey} from "@/api/user/user-query-options.ts";
import {classroomQueryKey} from "@/api/classroom/classroom-query-options.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";

export const subjectQueryKey = "subject";

export function createGetSubjectByIdOptions(id: string) {
    return queryOptions({
        queryKey: [subjectQueryKey, id],
        queryFn: () => getSubjectById(id)
    })
}

export function createCreateSubjectOptions(queryClient: QueryClient): UseMutationOptions<
    SubjectGetDetailDto,
    Error,
    SubjectCreateDto> {
    return {
        mutationFn: (dto: SubjectCreateDto) => createSubject(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [subjectQueryKey]});
        }
    }
}

export function createUpdateSubjectOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    SubjectGetDetailDto,
    Error,
    SubjectUpdateDto> {
    return {
        mutationFn: (dto: SubjectUpdateDto) => updateSubject(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [subjectQueryKey, id]});
        }
    }
}

export function createDeleteSubjectOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    void,
    Error,
    void> {
    return {
        mutationFn: () => deleteSubject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [subjectQueryKey]});
        }
    }
}

export function createSubjectInfiniteQueryOptions() {
    return infiniteQueryOptions({
        queryKey: [subjectQueryKey, "infinite"],
        queryFn: ({pageParam}) => getSubjectPaged(pageParam, 20),
        ...springInfiniteBase
    })
}

export function createSubjectByNameInfiniteQueryOptions(searchItem: string) {
    return infiniteQueryOptions({
        queryKey: [subjectQueryKey, "infinite", searchItem],
        queryFn: ({pageParam}) => getSubjectByNamePaged(pageParam, searchItem),
        ...springInfiniteBase
    })
}

export function createAddStudentToSubjectOptions(dto: SubjectStudentDto, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void>{
    return {
        mutationKey: [subjectQueryKey, dto.subjectId],
        mutationFn: () => addStudentToSubject(dto),
        onSuccess: () => {

            queryClient.invalidateQueries({queryKey: [userQueryKey]});
            queryClient.invalidateQueries({queryKey: [subjectQueryKey]});
        }
    }
}

export function createRemoveStudentFromSubjectOptions(dto: SubjectStudentDto, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [subjectQueryKey, dto.subjectId],
        mutationFn: () => removeStudentFromSubject(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [userQueryKey]});
            queryClient.invalidateQueries({queryKey: [subjectQueryKey]});
        }
    }
}

export function createAddClassroomToSubjectOptions(dto: SubjectClassroomDto, queryClient: QueryClient): UseMutationOptions<void, AxiosError, void> {
    return {
        mutationKey: [subjectQueryKey, dto.subjectId],
        mutationFn: () => addClassroomToSubject(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [subjectQueryKey, dto.subjectId]});
            queryClient.invalidateQueries({queryKey: [classroomQueryKey, dto.classroomId]});
        }
    }
}

