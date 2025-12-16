import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {useState} from "react";
import { createCategoryInfiniteSearch} from "@/api/category/category-query-options.ts";
import {useInfiniteQuery} from '@tanstack/react-query';
import type {CategoryGetListDto} from "@/api/category/category-dtos.ts";
import {useDebounce} from "use-debounce";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import {Button} from "@mui/material";
import {CustomSpeedDial, type SpeedDialActionItem} from "@/components/util/custom-speed-dial.tsx";
import CategoryIcon from "@mui/icons-material/Category";
import {AuthService} from "@/api/util/auth-service.ts";

export const Route = createFileRoute('/app/categories/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchItem, 300);
    const categoriesQuery = useInfiniteQuery(createCategoryInfiniteSearch({search: debouncedSearch}));
    if (categoriesQuery.isError) return <></>

    const categories: CategoryGetListDto[] = categoriesQuery.data?.pages.flatMap(page => page.content) ?? [];
    return (
        <TopBarItemsGrid>
            <SearchableCardSectionTopBarActions
                title={"Všechny kategorie"}
                onSearch={
                    (search: string) => {
                        setSearchItem(search)
                    }
                }/>
            {categoriesQuery.isPending ? <MultipleCardSkeleton/> : (
                <>
                    <CategoryGrid list={categories}/>
                    {AuthService.atLeastTeacher() && <CategorySpeedDial/>}
                </>
            )}
            <Button onClick={() => categoriesQuery.fetchNextPage()}
                    disabled={!categoriesQuery.hasNextPage || categoriesQuery.isFetchingNextPage}
                    sx={{maxWidth: 200}}
                    variant="outlined">
                {

                    !categoriesQuery.hasNextPage ? "Vše načteno" :
                        categoriesQuery.isFetchingNextPage ? "Načítání..." : "Načíst další"

                }
            </Button>
        </TopBarItemsGrid>
    )
}

function CategorySpeedDial() {
    const navigate = useNavigate();
    const actions: SpeedDialActionItem[] = [
        {
            icon: <CategoryIcon color="secondary"/>,
            name: "Vytvořit kategorii",
            action: async () => {
                await navigate({
                    to: '/app/categories/create'
                })
            }
        }
    ]

    return (
        <CustomSpeedDial actions={actions}/>
    )
}
