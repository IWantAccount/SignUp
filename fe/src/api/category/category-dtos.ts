import type {NamedDtoWithId} from "@/api/universal/dto/named-dto-with-id.ts";
import type {NamedDto} from "@/api/universal/dto/named-dto.ts";

export interface CategoryGetDetailDto extends NamedDtoWithId {
    subjectNameId: NamedDtoWithId;
}

export interface CategoryGetListDto extends NamedDtoWithId {
    numberOfSigns: number;
    subjectNameId: NamedDtoWithId;
}

export interface CategoryCreateDto extends NamedDto {
    subjectId: string;
}

export interface CategoryUpdateDto extends NamedDto {
    subjectId: string;
}