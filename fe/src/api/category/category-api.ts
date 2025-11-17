import type {
    CategoryCreateDto,
    CategoryGetDetailDto,
    CategoryGetListDto, CategorySearchDto,
    CategoryUpdateDto
} from "@/api/category/category-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type { Page } from "../universal/pagination/spring-boot-page.ts";
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
    const res = await api.put<CategoryGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteCategory = async (id: string): Promise<void> => {
    await api.delete<void>(buildPath([url, id]));
}

export const getCategorySearch = async (options: {page: number; pageSize?: number, searchName?: string, subjectId?: string}): Promise<Page<CategoryGetListDto>> => {
    const dto: CategorySearchDto = {name: options.searchName ?? "", subjectId: options.subjectId};
    const res = await api.post<Page<CategoryGetListDto>>(buildPath([url, "search"], options.page, options.pageSize), dto);
    return res.data;
}