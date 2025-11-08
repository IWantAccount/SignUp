import {BaseGrid} from "@/components/grids/base-grid.tsx";
import {CategoryCard} from "../cards/category-card";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";

interface Props {
    list: CategoryGetListDto[];
}

export function CategoryGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map((category) => (
                    <CategoryCard numberOfSigns={category.numberOfSigns} subjectNameId={category.subjectNameId} name={category.name} id={category.id}/>
                ))}
        </BaseGrid>
    )
}