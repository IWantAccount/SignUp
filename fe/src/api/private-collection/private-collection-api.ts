import type {
    PrivateCollectionCreateDto,
    PrivateCollectionGetDetailDto,
    PrivateCollectionGetListDto,
    PrivateCollectionUpdateDto
} from "@/api/private-collection/private-collection-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "../universal/pagination/spring-boot-page.ts";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";


const url = "/private-collection";

export const getCollectionById = async (id: string): Promise<PrivateCollectionGetDetailDto> => {
    const res = await api.get<PrivateCollectionGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const updateCollectionById = async (id: string, updateDto: PrivateCollectionUpdateDto): Promise<PrivateCollectionGetDetailDto> => {
    const res = await api.put<PrivateCollectionGetDetailDto>(buildPath([url, id]), updateDto);
    return res.data;
}

export const createCollection = async (dto: PrivateCollectionCreateDto): Promise<PrivateCollectionGetDetailDto> => {
    //await new Promise(resolve => {setTimeout(resolve, 5000)})
    const res = await api.post<PrivateCollectionGetDetailDto>(url, dto);
    return res.data;
}

export const deleteCollectionById = async (id: string): Promise<void> => {
    await api.delete<PrivateCollectionGetDetailDto>(buildPath([url, id]));
}

export const getCollectionPaged = async (page: number, pageSize?: number): Promise<Page<PrivateCollectionGetListDto>> => {
    const res = await api.get<Page<PrivateCollectionGetListDto>>(buildPath([url], page, pageSize))
    return res.data;
}

export const getCollectionByNamePaged = async (name: string, page: number, pageSize?: number): Promise<Page<PrivateCollectionGetListDto>> => {
    const dto: NamedDto = {name: name};
    const res = await api.post<Page<PrivateCollectionGetListDto>>(buildPath([url, "by-name"], page, pageSize), dto);
    return res.data;
}
