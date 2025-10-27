import {infiniteQueryOptions, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {createSubject, getSubjectById, getSubjectPaged, updateSubject} from "@/api/subject/subject-api.ts";
import type {SubjectCreateDto, SubjectGetDetailDto, SubjectUpdateDto} from "@/api/subject/subject-dtos.ts";
import type {Page} from "@/api/universal/dto/spring-boot-page.ts";

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

export function createSubjectInfiniteQueryOptions() {
    return infiniteQueryOptions({
        queryKey: [subjectQueryKey, "infinite"],
        queryFn: ({pageParam}) => getSubjectPaged(pageParam, 2),
        initialPageParam: 0,
        getNextPageParam: (lastPage: Page<SubjectGetDetailDto>) => {
            const next = lastPage.number + 1;
            return next < lastPage.totalPages ? next : undefined;
        }
    })
}

