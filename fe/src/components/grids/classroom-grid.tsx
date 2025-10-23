import {ClassroomCard, type ClassroomCardProps} from "../cards/classroom-card";
import {BaseGrid} from "@/components/grids/base-grid.tsx";

interface Props {
    list: ClassroomCardProps[]
}

export function ClassroomGrid({list}: Props){
    return (
        <BaseGrid>
            {
                list.map((classroom)=> (
                    <ClassroomCard  classroomId={classroom.classroomId}
                                    name={classroom.name}
                                    studentCount={classroom.studentCount}/>
                ))
            }
        </BaseGrid>
    )
}