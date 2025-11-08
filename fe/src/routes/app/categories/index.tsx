import {createFileRoute} from '@tanstack/react-router'
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {useState} from "react";
import {createCategoryInfiniteQuery} from "@/api/category/category-query-options.ts";
import { useInfiniteQuery } from '@tanstack/react-query';
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";

export const Route = createFileRoute('/app/categories/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [searchItem, setSearchItem] = useState<string>("");
    const categoriesQuery = useInfiniteQuery(createCategoryInfiniteQuery(searchItem));
    if(categoriesQuery.isPending) return <BackdropLoading/>
    if(categoriesQuery.isError) return <></>

    const categories: CategoryGetListDto[] = categoriesQuery.data.pages.flatMap(page => page.content) ?? [];
    return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions
                title={"Všechny kategorie"}
                onSearch={
                    (search: string) => {
                        setSearchItem(search)
                    }
                }/>
            <CategoryGrid list={categories}/>
        </TopBarItemsGrid>
    )
}
