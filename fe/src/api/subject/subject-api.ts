import api from "@/api/universal/axios.ts";
import type {
    SubjectClassroomDto,
    SubjectCreateDto,
    SubjectGetDetailDto,
    SubjectGetListDto, SubjectStudentDto,
    SubjectUpdateDto
} from "@/api/subject/subject-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "@/api/universal/dto/spring-boot-page.ts";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";

const url = "/subject";

export const getSubjectById = async (id: string): Promise<SubjectGetDetailDto> => {
    const res = await api.get<SubjectGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createSubject = async (dto: SubjectCreateDto): Promise<SubjectGetDetailDto> => {
    const res = await api.post<SubjectGetDetailDto>(url, dto);
    return res.data;
}

export const updateSubject = async (id: string, dto: SubjectUpdateDto): Promise<SubjectGetDetailDto> => {
    const res = await api.put<SubjectGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteSubject = async (id: string): Promise<void> => {
    await api.delete<void>(buildPath([url, id]));
}

export const getSubjectPaged = async (page: number, pageSize?: number): Promise<Page<SubjectGetListDto>> => {
    const res = await api.get<Page<SubjectGetListDto>>(buildPath([url], page, pageSize));
    return res.data;
}

export const getSubjectByNamePaged = async (page: number, searchItem: string, pageSize?: number): Promise<Page<SubjectGetListDto>> => {
    const dto: NamedDto = {name: searchItem};
    const res = await api.post<Page<SubjectGetListDto>>(buildPath([url, "by-name"], page, pageSize), dto);
    return res.data;
}

export const addStudentToSubject = async (dto: SubjectStudentDto) : Promise<void> => {
    await api.post<void>(buildPath([url, "add-student"]), dto);
}

export const removeStudentFromSubject = async (dto: SubjectStudentDto) : Promise<void> => {
    await api.post<void>(buildPath([url, "remove-student"]), dto)
}

export const addClassroomToSubject = async (dto: SubjectClassroomDto): Promise<void> => {
    await api.post<void>(buildPath([url, "add-classroom"]), dto);
}