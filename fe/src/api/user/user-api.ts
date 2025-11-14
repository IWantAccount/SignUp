import type {
    StudentClassroomDto,
    StudentClassroomSearchDto,
    StudentInSubjectDto, StudentSubjectSearchDto,
    UserCreateDto,
    UserGetDetailDto,
    UserGetListDto, UserRoleNameDto,
    UserUpdateDto
} from "@/api/user/user-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import api from "@/api/universal/axios.ts";
import type {Page} from "@/api/universal/pagination/spring-boot-page.ts";
import type {UserRoleEnum} from "@/domain/user-role-enum.ts";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";

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
    await api.delete<void>(buildPath([url, id]));
}

export const getUserPaged = async (searchItem: string, page: number, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const dto: NamedDto = {name: searchItem};
    const res = await api.post<Page<UserGetListDto>>(buildPath([url, "by-name"], page, pageSize), dto);
    return res.data;
}

export const getUserByClassroomPaged = async (classroomId: string, page: number, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const res = await api.get<Page<UserGetListDto>>(buildPath([url, "by-classroom", classroomId], page, pageSize));
    return res.data;
}

export const getUserByClassroomAndNamePaged = async (classroomId: string, name: string, page: number, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const dto: StudentClassroomSearchDto = {classroomId: classroomId, studentName: name};
    const res = await api.post<Page<UserGetListDto>>(buildPath([url, "classroom-search"], page, pageSize), dto);
    return res.data;
}

export const getUserBySubjectAndNamePaged = async (subjectId: string, page: number, name?: string, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const search = name ?? "";
    const dto: StudentSubjectSearchDto = {studentName: search, subjectId: subjectId}
    const res = await api.post<Page<UserGetListDto>>(buildPath([url, "subject-search"], page, pageSize), dto);
    return res.data;
}

export const getStudentEnrolledInSubject = async (studentName: string, subjectId: string, page: number, pageSize?: number): Promise<Page<StudentInSubjectDto>> => {
    const dto: StudentSubjectSearchDto = {studentName: studentName, subjectId: subjectId};
    const res = await api.post<Page<StudentInSubjectDto>>(buildPath([url, "present-in-subject"], page, pageSize), dto);
    return res.data;
}

export const addStudentToClassroom = async (dto: StudentClassroomDto): Promise<void> => {
    await api.post<void>(buildPath([url, "add-classroom"]), dto);
}

export const removeStudentFromClassroom = async (dto: StudentClassroomDto): Promise<void> => {
    await api.post<void>(buildPath([url, "remove-classroom"]), dto);
}

export const getUserByRoleByName = async (role: UserRoleEnum, page: number, name?: string, pageSize?: number): Promise<Page<UserGetListDto>> => {
    const searchName = name ?? "";
    const dto: UserRoleNameDto = {name: searchName, role: role};
    const res = await api.post<Page<UserGetListDto>>(buildPath([url, "by-role-name"], page, pageSize), dto);
    return res.data;
}