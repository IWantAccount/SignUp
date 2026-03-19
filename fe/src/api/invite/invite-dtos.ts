import type {UserRoleEnum} from "@/domain/user-role-enum.ts";
import type {UserGetListDto} from "@/api/user/user-dtos.ts";

export interface InviteCreateDto {
    role: UserRoleEnum;
}

export interface InviteUpdateDto {
    role: UserRoleEnum;
}

export interface InviteGetDetailDto {
    id: string;
    role: UserRoleEnum;
    usedAt: string | null;
    createdUser: UserGetListDto | null;
}

export interface InviteGetListDto {
    id: string;
    role: UserRoleEnum;
    usedAt: string | null;
    createdUser: UserGetListDto | null;
}

export interface ProcessInviteDto {
    name: string;
    email: string;
    password: string;
}