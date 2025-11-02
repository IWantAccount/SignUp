import {createFileRoute} from '@tanstack/react-router'
import {Box} from "@mui/material";
import {CategoryGrid} from "@/components/grids/category-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";

export const Route = createFileRoute('/app/debug/categories')({
    component: RouteComponent,
})

function RouteComponent() {
    const categories = Array.from({length: 20}, (_, i) => ({
        categoryId: (i + 1).toString(),
        categoryName: "Kategorie " + (i + 1).toString(),
        signCount: i * 2,
        subjectId: (i + 156).toString(),
        subjectName: "Předmět " + (i + 1).toString(),
    }));
    return (
        <Box sx={{flexDirection: 'column', m: 1, display: 'flex', gap: 2}}>
            <SearchableCardSectionTopBarActions title={"ČZJ1"}
                                                onEditNavigate={
                                                    () => console.log("jdeme na editaci kategorie")
                                                }
                                                onDelete={
                                                    () => console.log("jdeme na smazání kategorie")
                                                }
                                                onSearch={
                                                    (searchTerm: string) => console.log("hledáme kategorie s termínem: " + searchTerm)
                                                }/>
            <CategoryGrid list={categories}/>
        </Box>
    )

}
