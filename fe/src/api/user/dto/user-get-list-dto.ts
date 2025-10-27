import type {NamedDtoWithId} from "@/api/universal/dto/named-dto-with-id.ts";

export interface UserGetListDto extends NamedDtoWithId {
    email: string;
    classroomName: string;
}