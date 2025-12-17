import {infiniteQueryOptions, type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {
    createClassroom,
    deleteClassroom,
    getClassroomById, getClassroomSearch,
    updateClassroom
} from "@/api/classroom/classroom-api.ts";
import type {
    ClassroomCreateDto,
    ClassroomGetDetailDto,
    ClassroomUpdateDto
} from "@/api/classroom/classroom-dtos.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import type {useNavigate} from "@tanstack/react-router";

export const classroomQueryKey = "classroom";

export function createGetClassroomByIdOptions(id: string) {
    return queryOptions({
        queryKey: [classroomQueryKey, id],
        queryFn: () => getClassroomById(id),
    })
}

export function createCreateClassroomOptions(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    ClassroomGetDetailDto,
    Error,
    ClassroomCreateDto> {
    return {
        mutationFn: (dto: ClassroomCreateDto) => createClassroom(dto),
        mutationKey: [classroomQueryKey],
        onSuccess: async (data: ClassroomGetDetailDto) => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [classroomQueryKey]}),
                navigate({
                    to: `/app/classrooms/${data.id}`
                })
            ])
        }
    }
}

export function createUpdateClassroomOptions(id: string, queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    ClassroomGetDetailDto,
    Error,
    ClassroomUpdateDto> {
    return {
        mutationFn: (dto: ClassroomUpdateDto) => updateClassroom(id, dto),
        mutationKey: [classroomQueryKey, id],
        onSuccess: async (data: ClassroomGetDetailDto) => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [classroomQueryKey]}),
                navigate({
                    to: `/app/classrooms/${data.id}`
                })
            ])
        }
    }
}

export function createDeleteClassroomOptions(id: string, queryClient: QueryClient): UseMutationOptions<void, Error, void> {
    return {
        mutationFn: () => deleteClassroom(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [classroomQueryKey]});
        }
    }
}

/**
 * Create options for infiniteQuery. You can specify search to filter based on name. Undefined is interpreted as any
 * */
export function createClassroomInfiniteSearch(search?: string, pageSize?: number) {
    return infiniteQueryOptions({
        queryKey: [classroomQueryKey, "infinite", search ?? ""],
        queryFn: ({pageParam}) => getClassroomSearch({page: pageParam, search: search, pageSize: pageSize}),
        ...springInfiniteBase
    })
}