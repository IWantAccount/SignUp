import type {NamedDto} from "@/api/universal/dto/named-dto.ts";
import type {NamedDtoWithId} from "@/api/universal/dto/named-dto-with-id.ts";
import type {UserDtos} from "@/api/user/user-dtos.ts";

export interface CollectionSignDto{
    collectionId: string;
    signId: string;
}

export interface PrivateCollectionCreateDto extends NamedDto {
    ownerId: string;
}

export interface PrivateCollectionGetDetailDto extends NamedDtoWithId {
    owner: UserDtos;
}

export interface PrivateCollectionGetListDto extends NamedDtoWithId {
    email: string;
    classroomName: string;
}

export interface PrivateCollectionUpdateDto extends NamedDto {

}