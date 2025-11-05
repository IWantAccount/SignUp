import type {
    CategoryCreateDto,
    CategoryGetDetailDto,
    CategoryGetListDto,
    CategoryUpdateDto
} from "@/api/category/category-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type { Page } from "../universal/dto/spring-boot-page";
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
    const size = pageSize ? pageSize : 20;
    const res = await api.get<Page<CategoryGetListDto>>(buildPath([url], page, size));
    return res.data;
}

export const getCategoryByNamePaged = async (page: number, searchItem: string, pageSize?: number): Promise<Page<CategoryGetListDto>> => {
    const size = pageSize ? pageSize : 20;
    const res = await api.get<Page<CategoryGetListDto>>(buildPath([url, "by-name"], page, size), {params: {name: searchItem}});
    return res.data;
}