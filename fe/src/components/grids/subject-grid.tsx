import {SubjectCard, type SubjectCardProps } from "../cards/subject-card";
import {BaseGrid} from "@/components/grids/base-grid.tsx";

interface Props {
    list: SubjectCardProps[];
}

export function SubjectGrid({ list }: Props) {
    return (
        <BaseGrid>
            {
                list.map(subject => (
                    <SubjectCard    id={subject.id}
                                    name={subject.name}
                                    categoryCount={subject.categoryCount}
                                    studentCount={subject.studentCount}/>

                ))
            }
        </BaseGrid>
    )
}