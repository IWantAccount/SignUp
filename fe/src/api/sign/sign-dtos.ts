import type {SignComponentGetListDto} from "@/api/sign-component/sign-component-dtos.ts";
import type {SignType} from "@/domain/sign-type.ts";
import type {LanguageLevelType} from "@/domain/language-level.ts";
import type {Region} from "@/domain/region.ts";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";
import type {SubjectGetListDto} from "@/api/subject/subject-dtos.ts";
import type {IdDto} from "@/api/universal/dto/id-dto.ts";

export interface SignCreateDto {
    categoryId: string;
    type: SignType;
    languageLevel?: LanguageLevelType;
    region?: Region;
    translations: string[];
    explanation?: string;
    notation: NotationIdDto;
}

export interface SignUpdateDto {
    categoryId: string;
    type: SignType;
    languageLevel?: LanguageLevelType;
    region?: Region;
    translations: string[];
    explanation?: string;
    notation: NotationIdDto;

}

export interface SignGetListDto extends IdDto {
    videoFileName: string;
    category: CategoryGetListDto;
    translations: string[];
}

export interface SignGetDetailDto extends SignGetListDto{
    subject: SubjectGetListDto;
    region: Region;
    languageLevel: LanguageLevelType;
    signType: SignType;
    explanation: string;
    notation: NotationDto;
    videoFileName: string;
}

export interface NotationIdDto {
    bothHandsUsed: boolean;
    asymmetricSign: boolean;
    activeHandNotation: HandNotationIdDto;
    passiveHandNotation?: HandNotationIdDto;
    articulationLocationId?: string;
    movementId?: string;
    contactId?: string;
    handArrangementId?: string;
}

export interface HandNotationIdDto {
    handShapeId?: string;
    palmOrientationId?: string;
    fingerOrientationId?: string;
}

export interface NotationDto {
    bothHandsUsed: boolean;
    asymmetricSign: boolean;
    activeHandNotation: HandNotationDto;
    passiveHandNotation?: HandNotationDto;
    articulationLocation?: SignComponentGetListDto;
    movement?: SignComponentGetListDto;
    contact?: SignComponentGetListDto;
    handArrangement?: SignComponentGetListDto;
}

export interface HandNotationDto {
    handShape?: SignComponentGetListDto;
    palmOrientation?: SignComponentGetListDto;
    fingerOrientation?: SignComponentGetListDto;
}

export interface SearchDto {
    search: string;
}

export interface SearchEntityDto {
    entityId: string;
    search?: string;
}