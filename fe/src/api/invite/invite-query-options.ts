import {type QueryClient, queryOptions, type UseMutationOptions} from "@tanstack/react-query";
import {createInvite, getInviteById, processInvite} from "@/api/invite/invite-api.ts";
import type { useNavigate } from "@tanstack/react-router";
import type {InviteCreateDto, InviteGetDetailDto, ProcessInviteDto} from "@/api/invite/invite-dtos.ts";
import type {AxiosError} from "axios";

export const inviteQueryKey = "invite";

export function createGetInviteByIdOptions(id: string) {
    return queryOptions({
        queryKey: [inviteQueryKey, id],
        queryFn: () => getInviteById(id)
    })
}

export function createCreateInviteOptions(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    InviteGetDetailDto,
    AxiosError,
    InviteCreateDto> {
    return {
        mutationFn: (dto: InviteCreateDto) => createInvite(dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [inviteQueryKey]}),
                //navigate({
                    //to: `/app/home` // TODO change??
                //})
            ])
        }
    }
}

export function createProcessInviteOptions(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    InviteGetDetailDto,
    AxiosError,
    ProcessInviteVars> {
    return {
        mutationFn: (vars: ProcessInviteVars) => processInvite(vars.id, vars.dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [inviteQueryKey]}),
                navigate({
                    to: `/login`
                })
            ])
        }
    }
}

interface ProcessInviteVars {
    id: string;
    dto: ProcessInviteDto;
}