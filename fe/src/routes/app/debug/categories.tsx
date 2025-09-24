import { createFileRoute } from '@tanstack/react-router'
import {Box} from "@mui/material";
import {CategoryCard} from "@/components/cards/category-card.tsx";

export const Route = createFileRoute('/app/debug/categories')({
  component: RouteComponent,
})

function RouteComponent() {
    const categories = Array.from({ length: 20 }, (_, i) => ({
        name: "Kategorie " + (i + 1).toString(),
        signCount: i * 2,
        subjectId: (i + 156).toString(),
        subjectName: "Předmět " + (i + 1).toString(),
    }));
  return <>
      <h1>Zkouška vypisování kategorií</h1>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }}>
        {
            categories.map((category, index) => (
                <CategoryCard categoryId={index.toString()} categoryName={category.name}
                              signCount={category.signCount} subjectId={category.subjectId}
                              subjectName={category.subjectName}></CategoryCard>
            ))
        }
    </Box>
  </>
}
