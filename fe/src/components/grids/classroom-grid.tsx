import {ClassroomCard} from "../cards/classroom-card";
import {BaseGrid} from "@/components/grids/base-grid.tsx";
import type {ClassroomGetListDto} from "@/api/classroom/classroom-dtos.ts";

interface Props {
    list: ClassroomGetListDto[]
}

export function ClassroomGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map((classroom) => (
                    <ClassroomCard key={classroom.id} {...classroom}/>
                ))
            }
        </BaseGrid>
    )
}