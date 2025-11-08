import type {UserCreateDto, UserGetDetailDto, UserGetListDto, UserUpdateDto} from "@/api/user/user-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import api from "@/api/universal/axios.ts";
import type {Page} from "@/api/universal/dto/spring-boot-page.ts";

const url = "/user";

export const getUserById = async (id: string): Promise<UserGetDetailDto> => {
    const res = await api.get<UserGetDetailDto>(buildPath([url, id]));
    return res.data;
}

export const createUser = async (user: UserCreateDto): Promise<UserGetDetailDto> => {
    const res = await api.post<UserGetDetailDto>(buildPath([url]), user);
    return res.data;
}

export const updateUser = async (id: string, user: UserUpdateDto): Promise<UserGetDetailDto> => {
    const res = await api.put<UserGetDetailDto>(buildPath([url, id]), user);
    return res.data;
}

export const deleteUser = async (id: string): Promise<void> => {
    await new Promise(resolve => {
        setTimeout(resolve, 3000)
    })
    await api.delete<void>(buildPath([url, id]));
}

export const getUserPaged = async (page: number, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const size = pageSize ? pageSize : 20;
    const res = await api.get<Page<UserGetListDto>>(buildPath([url], page, size))
    return res.data;
}

export const getUserByClassroomPaged = async (classroomId: string, page: number, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const size = pageSize ? pageSize : 20;
    const res = await api.get<Page<UserGetListDto>>(buildPath([url, "by-classroom", classroomId], page, size));
    return res.data;
}

export const getUserByClassroomAndNamePaged = async (classroomId: string, name: string, page: number, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const size = pageSize ? pageSize : 20;
    const res = await api.get<Page<UserGetListDto>>(buildPath([url, "classroom-search", classroomId], page, size), {params: {name: name}});
    return res.data;
}