import api from "@/api/universal/axios.ts";
import type {
    SubjectClassroomDto,
    SubjectCreateDto,
    SubjectGetDetailDto,
    SubjectGetListDto, SubjectSearchDto, SubjectStudentDto,
    SubjectUpdateDto
} from "@/api/subject/subject-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "@/api/universal/pagination/spring-boot-page.ts";

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

export const getSubjectSearch = async (opt: {page: number, pageSize?: number, dto: SubjectSearchDto}): Promise<Page<SubjectGetListDto>> => {
    const res = await api.post<Page<SubjectGetListDto>>(buildPath([url, "search"], opt.page, opt.pageSize), opt.dto);
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