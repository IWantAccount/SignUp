import {infiniteQueryOptions, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {createClassroom, getClassroomById, getClassroomPaged, updateClassroom} from "@/api/classroom/classroom-api.ts";
import type {
    ClassroomCreateDto,
    ClassroomGetDetailDto,
    ClassroomGetListDto,
    ClassroomUpdateDto
} from "@/api/classroom/classroom-dtos.ts";
import type { Page } from "../universal/dto/spring-boot-page";

export const classroomQueryKey = "classroom";

export function createGetClassroomByIdOptions(id: string) {
    return queryOptions({
        queryKey: [classroomQueryKey, id],
        queryFn: () => getClassroomById(id)
    })
}

export function createCreateClassroomOptions(): UseMutationOptions<
    ClassroomGetDetailDto,
    Error,
    ClassroomCreateDto> {
    return {
        mutationFn: (dto: ClassroomCreateDto) => createClassroom(dto),
    }
}

export function createUpdateClassroomOptions(id: string): UseMutationOptions<
    ClassroomGetDetailDto,
    Error,
    ClassroomUpdateDto> {
    return {
        mutationFn: (dto: ClassroomUpdateDto) => updateClassroom(id, dto),
    }
}

export function createClassroomInfiniteQueryOptions(){
    return infiniteQueryOptions({
        queryKey: [classroomQueryKey, "infinite"],
        queryFn: ({pageParam}) => getClassroomPaged(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<ClassroomGetListDto>) => {
            const next = lastPage.number + 1;
            return next < lastPage.totalPages ? next : undefined;
        }
    })
}