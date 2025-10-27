import type {
    PrivateCollectionCreateDto,
    PrivateCollectionGetDetailDto, PrivateCollectionUpdateDto
} from "@/api/private-collection/private-collection-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";


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
    const res = await api.post<PrivateCollectionGetDetailDto>(url, dto);
    return res.data;
}

export const deleteCollectionById = async (id: string): Promise<void> => {
    await api.delete<PrivateCollectionGetDetailDto>(buildPath([url, id]));
}
