import api from "@/api/universal/axios.ts";
import type {ClassroomCreateDto, ClassroomGetDetailDto, ClassroomGetListDto, ClassroomUpdateDto} from "@/api/classroom/classroom-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type { Page } from "../universal/dto/spring-boot-page";

const url = "classroom";

export const getClassroomById = async (id: string): Promise<ClassroomGetDetailDto> => {
    const res = await api.get<ClassroomGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createClassroom = async (dto: ClassroomCreateDto): Promise<ClassroomGetDetailDto> => {
    const res = await api.post<ClassroomGetDetailDto>(buildPath([url]), dto)
    return res.data;
}

export const updateClassroom = async (id: string, dto: ClassroomUpdateDto): Promise<ClassroomGetDetailDto> => {
    const res = await api.put<ClassroomGetDetailDto>(buildPath([url, id]), dto)
    return res.data;
}

export const deleteSubject = async (subjectId: string): Promise<void> => {
    await api.delete<void>(buildPath([url, subjectId]));
}

export const getClassroomPaged = async (page: number, pageSize?: number ): Promise<Page<ClassroomGetListDto>> => {
    const size = pageSize ? pageSize : 20;
    const res = await api.get<Page<ClassroomGetListDto>>(buildPath([url], page, size));
    return res.data;
}