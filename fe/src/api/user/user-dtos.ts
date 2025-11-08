import type {UserRoleEnum} from "@/domain/user-role-enum.ts";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";
import type {IdDto} from "@/api/universal/dto/id-dto.ts";

interface UserDto extends NamedDto {
    email: string;
    role: UserRoleEnum;
}

interface UserDtoWithId extends UserDto, IdDto {

}

export interface StudentClassroomDto {
    studentId: string;
    classroomId: string;
}

export interface UserCreateDto extends UserDto {
    password: string;
}

export interface UserGetDetailDto extends UserDtoWithId {
    classroomName: string;
}

export interface UserGetListDto extends UserDtoWithId {
    classroomName: string;
}

export interface UserUpdateDto extends UserDto {
    password: string;
}

export interface StudentSubjectSearchDto {
    subjectId: string;
    studentName: string;
}

export interface StudentInSubjectDto {
    studentName: string;
    studentId: string;
    subjectId: string;
    inGivenSubject: boolean;
}