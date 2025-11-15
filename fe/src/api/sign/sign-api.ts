import type {SignCreateDto, SignGetDetailDto, SignUpdateDto} from "@/api/sign/sign-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";

const url = "/sign";

export const getSignById = async (id: string): Promise<SignGetDetailDto> => {
    const res = await api.get<SignGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createSign = async (dto: SignCreateDto, video: File) => {
    //TODO + navratovy typ
    return null;
}

export const updateSign = async (id: string, dto: SignUpdateDto): Promise<SignGetDetailDto> => {
    const res = await api.put<SignGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteSign = async (id: string): Promise<void> => {
    await api.delete(buildPath([url, id]));
}

//TODO vymena videa