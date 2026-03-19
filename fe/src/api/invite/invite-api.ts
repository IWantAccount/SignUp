import type {InviteCreateDto, InviteGetDetailDto, InviteUpdateDto, ProcessInviteDto} from "@/api/invite/invite-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import api from "@/api/universal/axios.ts";

const url = "/invite";

export const getInviteById = async (id: string): Promise<InviteGetDetailDto> => {
    const res = await api.get<InviteGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createInvite = async (invite: InviteCreateDto): Promise<InviteGetDetailDto> => {
    const res = await api.post<InviteGetDetailDto>(buildPath([url]), invite);
    return res.data;
}

export const updateInvite = async (id: string, invite: InviteUpdateDto): Promise<InviteGetDetailDto> => {
    const res = await api.put<InviteGetDetailDto>(buildPath([url, id]), invite);
    return res.data;
}

export const deleteInvite = async (id: string): Promise<void> => {
    await api.delete<void>(buildPath([url, id]));
}

export const processInvite = async (inviteId: string, dto: ProcessInviteDto): Promise<InviteGetDetailDto> => {
    const res = await api.post<InviteGetDetailDto>(buildPath([url, inviteId]), dto);
    return res.data;
}