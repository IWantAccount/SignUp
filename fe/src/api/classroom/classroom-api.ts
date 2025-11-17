import api from "@/api/universal/axios.ts";
import type {
    ClassroomCreateDto,
    ClassroomGetDetailDto,
    ClassroomGetListDto,
    ClassroomUpdateDto
} from "@/api/classroom/classroom-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "../universal/pagination/spring-boot-page.ts";
import type {NameSearchDto} from "@/api/universal/dto/name-search-dto.ts";

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

export const getClassroomSearch = async (options: {page: number, pageSize?: number, searchName?: string}): Promise<Page<ClassroomGetListDto>> => {
    const dto: NameSearchDto = {name: options.searchName ?? ""};
    const res = await api.post<Page<ClassroomGetListDto>>(
        buildPath([url, "search"], options.page, options.pageSize), dto);
    return res.data;
}