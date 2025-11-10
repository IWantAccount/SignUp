import type {
    CategoryCreateDto,
    CategoryGetDetailDto,
    CategoryGetListDto,
    CategoryUpdateDto
} from "@/api/category/category-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type { Page } from "../universal/dto/spring-boot-page";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";
const url = "/category";

export const getCategoryById = async (id: string): Promise<CategoryGetDetailDto> => {
    const res = await api.get<CategoryGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createCategory = async (dto: CategoryCreateDto): Promise<CategoryGetDetailDto> => {
    const res = await api.post<CategoryGetDetailDto>(url, dto);
    return res.data
}

export const updateCategory = async (id: string, dto: CategoryUpdateDto): Promise<CategoryGetDetailDto> => {
    const res = await api.post<CategoryGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteCategory = async (id: string): Promise<void> => {
    await api.delete<void>(buildPath([url, id]));
}

export const getCategoryPaged = async (page: number, pageSize?: number): Promise<Page<CategoryGetListDto>> => {
    const res = await api.get<Page<CategoryGetListDto>>(buildPath([url], page, pageSize));
    return res.data;
}

export const getCategoryByNamePaged = async (page: number, searchItem: string, pageSize?: number): Promise<Page<CategoryGetListDto>> => {
    const dto: NamedDto = {name: searchItem};
    const res = await api.post<Page<CategoryGetListDto>>(buildPath([url, "by-name"], page, pageSize), dto);
    return res.data;
}

export const getCategorySubjectSearchPaged = async (page: number, searchItem: string, subjectId: string, pageSize?: number): Promise<Page<CategoryGetListDto>> => {
    const dto: NamedDto = {name: searchItem}
    const res = await api.post<Page<CategoryGetListDto>>(buildPath([url, "subject-search", subjectId], page, pageSize), dto);
    return res.data;
}