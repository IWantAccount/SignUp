import type { NamedDto } from "./named-dto";
import type {IdDto} from "@/api/universal/dto/id-dto.ts";

export interface NamedDtoWithId extends NamedDto, IdDto {

}