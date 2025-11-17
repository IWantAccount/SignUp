import type {
    StudentClassroomDto,
    StudentInSubjectDto, StudentSubjectSearchDto,
    UserCreateDto,
    UserGetDetailDto,
    UserGetListDto, UserSearchDto,
    UserUpdateDto
} from "@/api/user/user-dtos.ts";
import {buildPath} from "@/api/util/build-path.ts";
import api from "@/api/universal/axios.ts";
import type {Page} from "@/api/universal/pagination/spring-boot-page.ts";

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

export const getUserSearch = async (opt: {
    dto: UserSearchDto;
    page: number;
    pageSize?: number;
}): Promise<Page<UserGetListDto>> => {
    const res = await api.post<Page<UserGetListDto>>(buildPath([url, "search"], opt.page, opt.pageSize), opt.dto);
    return res.data;
}