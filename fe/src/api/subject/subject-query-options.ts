import {queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {createSubject, getSubjectById, updateSubject} from "@/api/subject/subject-api.ts";
import type {SubjectCreateDto, SubjectGetDetailDto, SubjectUpdateDto} from "@/api/subject/subject-dtos.ts";

export const subjectQueryKey = "subject";

export function createGetSubjectByIdOptions(id: string) {
    return queryOptions({
        queryKey: [subjectQueryKey, id],
        queryFn: () => getSubjectById(id)
    })
}

export function createCreateSubjectOptions(): UseMutationOptions<
    SubjectGetDetailDto,
    Error,
    SubjectCreateDto> {
    return {
        mutationFn: (dto: SubjectCreateDto) =>  createSubject(dto)
    }
}

export function createUpdateSubjectOptions(id: string): UseMutationOptions<
    SubjectGetDetailDto,
    Error,
    SubjectUpdateDto> {
    return {
        mutationFn: (dto: SubjectUpdateDto) => updateSubject(id, dto)
    }
}

