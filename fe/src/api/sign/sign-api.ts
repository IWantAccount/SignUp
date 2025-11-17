import type {
    SearchDto,
    SearchEntityDto,
    SignCreateDto,
    SignGetDetailDto,
    SignGetListDto,
    SignUpdateDto
} from "@/api/sign/sign-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type { Page } from "../universal/pagination/spring-boot-page";

const url = "/sign";

export const getSignById = async (id: string): Promise<SignGetDetailDto> => {
    const res = await api.get<SignGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createSign = async (dto: SignCreateDto, video: File): Promise<SignGetDetailDto> => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

    const res = await api.post<SignGetDetailDto>(buildPath([url]), formData, {headers: {"Content-Type": "multipart/form-data"}});
    return res.data
}

export const updateSign = async (id: string, dto: SignUpdateDto): Promise<SignGetDetailDto> => {
    const res = await api.put<SignGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteSign = async (id: string): Promise<void> => {
    await api.delete(buildPath([url, id]));
}

export const getSignByTranslation = async (translation: string, page: number, pageSize?: number): Promise<Page<SignGetListDto>> => {
    const dto: SearchDto = {search: translation};
    const res = await api.post<Page<SignGetListDto>>(buildPath([url, "by-translation"], page, pageSize), dto);
    return res.data;
}

export const getSignByCategorySearch = async (categoryId: string, page: number, search?: string, pageSize?: number): Promise<Page<SignGetListDto>> => {
    const dto: SearchEntityDto = {entityId: categoryId, search: search};
    const res = await api.post<Page<SignGetListDto>>(buildPath([url, "category-search"], page, pageSize), dto);
    return res.data;
}

export const getSignByPrivateCollectionSearch = async (collectionId: string, page: number, search?: string, pageSize?: number): Promise<Page<SignGetListDto>> => {
    const dto: SearchEntityDto = {entityId: collectionId, search: search};
    const res = await api.post<Page<SignGetListDto>>(buildPath([url, "collection-search"], page, pageSize), dto);
    return res.data;
}
//TODO vymena videa