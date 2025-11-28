import type {
    SignComponentCreateDto,
    SignComponentGetDetailDto,
    SignComponentGetListDto, SignComponentSearchDto,
    SignComponentUpdateDto
} from "@/api/sign-component/sign-component-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "@/api/universal/pagination/spring-boot-page.ts";
import type {SignComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";

const url = "sign-component";

export const getSignComponentById = async (id: string): Promise<SignComponentGetDetailDto> => {
    const res = await api.get<SignComponentGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createSignComponent = async (dto: SignComponentCreateDto): Promise<SignComponentGetDetailDto> => {
    const res = await api.post<SignComponentGetDetailDto>(buildPath([url]), dto);
    return res.data;
}

export const updateSignComponent = async (id: string, dto: SignComponentUpdateDto): Promise<SignComponentGetDetailDto> => {
    const res = await api.put<SignComponentGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteSignComponent = async (id: string): Promise<void> => {
    await api.delete<void>(buildPath([url, id]));
}

export const getSignComponentSearch = async (opt: {description?: string, type?: SignComponentTypeEnum, page: number, pageSize?: number}): Promise<Page<SignComponentGetListDto>> => {
    const dto: SignComponentSearchDto = {description: opt.description, type: opt.type};
    const res = await api.post<Page<SignComponentGetListDto>>(buildPath([url, "search"], opt.page, opt.pageSize), dto);
    return res.data;
}