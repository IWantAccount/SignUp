import type {NamedDto} from "@/api/universal/dto/named-dto.ts";
import type {NamedDtoWithId} from "@/api/universal/dto/named-dto-with-id.ts";

export interface SubjectCreateDto extends NamedDto {

}

export interface SubjectGetDetailDto extends NamedDtoWithId {

}

export interface SubjectGetListDto extends NamedDtoWithId {
    numberOfStudents: number;
    numberOfCategories: number;
}

export interface SubjectUpdateDto extends NamedDto {

}

export interface SubjectStudentDto {
    studentId: string;
    subjectId: string;
}