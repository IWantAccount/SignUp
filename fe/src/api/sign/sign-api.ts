import type {
    SearchSignDto,
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

    const res = await api.post<SignGetDetailDto>(buildPath([url]), );
    return res.data
}

export const updateSign = async (id: string, dto: SignUpdateDto): Promise<SignGetDetailDto> => {
    const res = await api.put<SignGetDetailDto>(buildPath([url, id]), dto);
    return res.data;
}

export const deleteSign = async (id: string): Promise<void> => {
    await api.delete(buildPath([url, id]));
}

export const getSignSearch = async(options: {page: number, pageSize?: number, dto: SearchSignDto}): Promise<Page<SignGetListDto>> => {
    const res = await api.post<Page<SignGetListDto>>(buildPath([url, "search"], options.page, options.pageSize), options.dto);
    return res.data
}