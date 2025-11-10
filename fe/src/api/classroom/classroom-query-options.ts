import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    createClassroom,
    deleteClassroom,
    getClassroomById, getClassroomByName,
    updateClassroom
} from "@/api/classroom/classroom-api.ts";
import type {
    ClassroomCreateDto,
    ClassroomGetDetailDto,
    ClassroomUpdateDto
} from "@/api/classroom/classroom-dtos.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";

export const classroomQueryKey = "classroom";

export function createGetClassroomByIdOptions(id: string) {
    return queryOptions({
        queryKey: [classroomQueryKey, id],
        queryFn: () => getClassroomById(id),
    })
}

export function createCreateClassroomOptions(queryClient: QueryClient): UseMutationOptions<
    ClassroomGetDetailDto,
    Error,
    ClassroomCreateDto> {
    return {
        mutationFn: (dto: ClassroomCreateDto) => createClassroom(dto),
        mutationKey: [classroomQueryKey],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [classroomQueryKey]});
        }
    }
}

export function createUpdateClassroomOptions(id: string, queryClient: QueryClient): UseMutationOptions<
    ClassroomGetDetailDto,
    Error,
    ClassroomUpdateDto> {
    return {
        mutationFn: (dto: ClassroomUpdateDto) => updateClassroom(id, dto),
        mutationKey: [classroomQueryKey, id],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [classroomQueryKey]});
        }
    }
}

export function createDeleteClassroomOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, string> {
    return {
        mutationFn: (id: string) => deleteClassroom(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [classroomQueryKey]});
        }
    }
}

export function createClassroomInfiniteQueryOptions(searchItem?: string) {
    const search = searchItem ?? "";
    return infiniteQueryOptions({
        queryKey: [classroomQueryKey, "infinite", search],
        queryFn: ({pageParam}) => getClassroomByName(search, pageParam),
        ...springInfiniteBase
    })
}