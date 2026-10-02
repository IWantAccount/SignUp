import type {PasswordRequestDto, PasswordRestoreDto} from "@/api/password/password-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";

const url = "user"

export const requestPasswordChange = async (dto: PasswordRequestDto): Promise<void> => {
    await api.post<void>(buildPath([url, "req-passwd-change"]), dto);
}

export const restorePassword = async (dto: PasswordRestoreDto): Promise<void> => {
    await api.post<void>(buildPath([url, "restore-password"]), dto);
}