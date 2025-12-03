import type {
    CollectionSignDto, CollectionSignSearchDto,
    PrivateCollectionCreateDto,
    PrivateCollectionGetDetailDto,
    PrivateCollectionGetListDto,
    PrivateCollectionUpdateDto, SignInCollectionDto
} from "@/api/private-collection/private-collection-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "../universal/pagination/spring-boot-page.ts";
import type {NameSearchDto} from "@/api/universal/dto/name-search-dto.ts";


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

export const getCollectionSearch = async (options: {page: number, pageSize?: number, search?: string}): Promise<Page<PrivateCollectionGetListDto>> => {
    const dto: NameSearchDto = {name: options.search};
    const res = await api.post<Page<PrivateCollectionGetListDto>>(buildPath([url, "search"], options.page, options.pageSize), dto);
    return res.data;
}

export const addSignToCollection = async(dto: CollectionSignDto): Promise<void> => {
    await api.post<void>(buildPath([url, "add-sign"]), dto);
}

export const removeSignFromCollection = async (dto: CollectionSignDto): Promise<void> => {
    await api.post<void>(buildPath([url, "remove-sign"]), dto);
}

export const collectionSignSearch = async (dto: CollectionSignSearchDto, page: number, pageSize?: number): Promise<Page<SignInCollectionDto>> => {
    const res = await  api.post<Page<SignInCollectionDto>>(buildPath([url, "sign-search"], page, pageSize), dto);
    return res.data;
}
