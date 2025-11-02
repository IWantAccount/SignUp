import {SubjectCard} from "../cards/subject-card";
import {BaseGrid} from "@/components/grids/base-grid.tsx";
import type {SubjectGetListDto} from "@/api/subject/subject-dtos.ts";

interface Props {
    list: SubjectGetListDto[];
}

export function SubjectGrid({ list }: Props) {
    return (
        <BaseGrid>
            {
                list.map(subject => (
                    <SubjectCard    id={subject.id}
                                    name={subject.name}
                                    numberOfCategories={subject.numberOfCategories}
                                    numberOfStudents={subject.numberOfStudents}/>

                ))
            }
        </BaseGrid>
    )
}