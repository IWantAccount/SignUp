import type {QueryClient, UseMutationOptions} from "@tanstack/react-query";
import type {useNavigate} from "@tanstack/react-router";
import type {AxiosError} from "axios";
import type {PasswordRequestDto, PasswordRestoreDto} from "@/api/password/password-dtos.ts";
import {requestPasswordChange, restorePassword} from "@/api/password/password-api.ts";

export const passwordQueryKey = "passwd"

export function createPasswordReqQueryOpt(queryClient: QueryClient): UseMutationOptions<
    void,
    AxiosError,
    PasswordRequestDto
> {
    return {
        mutationFn: (dto: PasswordRequestDto) => requestPasswordChange(dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [passwordQueryKey]}),
            ])
        }
    }
}

export function createPasswordRestoreQueryOpt(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<
    void,
    AxiosError,
    PasswordRestoreDto
> {
    return {
        mutationFn: (dto: PasswordRestoreDto) => restorePassword(dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [passwordQueryKey]}),
                navigate({
                    to: `/login`
                })
            ])
        }
    }
}