import type {QueryClient, UseMutationOptions} from "@tanstack/react-query";
import type {SignCreateDto, SignGetDetailDto} from "@/api/sign/sign-dtos.ts";
import type {AxiosError} from "axios";
import {createSign} from "@/api/sign/sign-api.ts";

export const signQueryKey = "sign";
export function createCreateSignOptions(queryClient: QueryClient): UseMutationOptions<
    SignGetDetailDto,
    AxiosError,
    CreateSign> {
    return {
        mutationKey: [signQueryKey],
        mutationFn: (vars: CreateSign) => createSign(vars.dto, vars.video),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [signQueryKey]})
        }
    }
}

interface CreateSign {
    dto: SignCreateDto;
    video: File;
}