import type {NamedDto} from "@/api/universal/dto/named-dto.ts";
import type {NamedDtoWithId} from "@/api/universal/dto/named-dto-with-id.ts";

export interface ClassroomCreateDto extends NamedDto {

}

export interface ClassroomGetDetailDto extends NamedDtoWithId {

}

export interface ClassroomGetListDto extends NamedDtoWithId {
    numberOfStudents: number;
}

export interface ClassroomUpdateDto extends NamedDto {

}

