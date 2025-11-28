import type {SignComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";
import type {IdDto} from "@/api/universal/dto/id-dto.ts";

export interface SignComponentCreateDto {
    textDescription: string;
    type: SignComponentTypeEnum;
}

export interface SignComponentUpdateDto {
    textDescription: string;
}

export interface SignComponentGetDetailDto extends IdDto {
    textDescription: string;
    type: SignComponentTypeEnum;
}

export interface SignComponentGetListDto extends IdDto {
    textDescription: string;
    type: SignComponentTypeEnum;
}


export interface ComponentTypeDescriptionDto {
    description: string;
    type?: SignComponentTypeEnum;
}

export interface SignComponentSearchDto {
    description?: string;
    type?: SignComponentTypeEnum;
}