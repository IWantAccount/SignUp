import {BaseGrid} from "@/components/grids/base-grid.tsx";
import {CategoryCard, type CategoryCardProps} from "../cards/category-card";

interface Props {
    list: CategoryCardProps[];
}

export function CategoryGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map((category) => (
                <CategoryCard   categoryId={category.categoryId}
                                categoryName={category.categoryName}
                                signCount={category.signCount}
                                subjectId={category.subjectId}
                                subjectName={category.subjectName}  />
            ))}
        </BaseGrid>
    )
}