import type {UserRoleEnum} from "@/domain/user-role-enum.ts";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";
import type {IdDto} from "@/api/universal/dto/id-dto.ts";
import type {NameSearchDto} from "@/api/universal/dto/name-search-dto.ts";

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
    password?: string;
}

export interface UserGetDetailDto extends UserDtoWithId {
    classroomName: string;
}

export interface UserGetListDto extends UserDtoWithId {
    classroomName: string;
    classroomId?: string;
    email: string;
}

export interface UserUpdateDto extends UserDto {
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

export interface StudentClassroomDto {
    classroomId: string;
    studentId: string;
}

export interface UserSearchDto extends NameSearchDto{
    email?: string | null;
    role?: UserRoleEnum | null;
    classroomId?: string | null;
    subjectId?: string | null;
}