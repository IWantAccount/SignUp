import api from "@/api/universal/axios.ts";
import type {SubjectCreateDto, SubjectGetDetailDto, SubjectUpdateDto} from "@/api/subject/subject-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";

const url = "/subject";

export const getSubjectById = async (id: string): Promise<SubjectGetDetailDto> => {
    const res = await api.get<SubjectGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createSubject = async (dto: SubjectCreateDto): Promise<SubjectGetDetailDto> => {
    const res = await api.post<SubjectGetDetailDto>(url, dto);
    return res.data;
}

export const updateSubject = async (id:string, dto: SubjectUpdateDto): Promise<SubjectGetDetailDto> => {
    const res = await api.put<SubjectGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteSubject = async(id: string): Promise<void> => {
    await api.delete<SubjectGetDetailDto>(buildPath([url, id]));
}