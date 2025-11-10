import api from "@/api/universal/axios.ts";
import type {
    ClassroomCreateDto,
    ClassroomGetDetailDto,
    ClassroomGetListDto,
    ClassroomUpdateDto
} from "@/api/classroom/classroom-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "../universal/dto/spring-boot-page";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";

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

export const deleteClassroom = async (classroomId: string): Promise<void> => {
    await api.delete<void>(buildPath([url, classroomId]));
}

export const getClassroomPaged = async (page: number, pageSize?: number): Promise<Page<ClassroomGetListDto>> => {
    const res = await api.get<Page<ClassroomGetListDto>>(buildPath([url], page, pageSize));
    return res.data;
}

export const getClassroomByName = async (name: string, page: number, pageSize?: number): Promise<Page<ClassroomGetListDto>> => {
    const dto: NamedDto = {name: name}
    const res = await api.post<Page<ClassroomGetListDto>>(buildPath([url, "by-name"], page, pageSize), dto);
    return res.data;
}