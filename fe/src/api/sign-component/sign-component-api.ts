import type {
    ComponentTypeDto,
    SignComponentCreateDto,
    SignComponentGetDetailDto, SignComponentGetListDto,
    SignComponentUpdateDto
} from "@/api/sign-component/sign-component-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "@/api/universal/dto/spring-boot-page.ts";
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

export const getSignComponentPaged = async (page: number, pageSize?: number): Promise<Page<SignComponentGetListDto>> => {
    const size = pageSize ? pageSize : 20;
    const res = await api.get<Page<SignComponentGetListDto>>(buildPath([url], page, size));
    return res.data;
}

export const getSignComponentPagedByType = async (type: SignComponentTypeEnum, page: number, pageSize: number):
    Promise<Page<SignComponentGetListDto>> => {
    const size = pageSize ? pageSize : 20;
    const typeDto: ComponentTypeDto = {type}
    const res = await api.post<Page<SignComponentGetListDto>>(buildPath([url], page, size), typeDto);
    return res.data;
}