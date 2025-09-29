import { createFileRoute } from '@tanstack/react-router'
import {Box, Typography} from "@mui/material";
import {CategoryForm} from "@/components/forms/category-form.tsx";

export const Route = createFileRoute('/app/categories/$categoryId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  //TODO tohle načíst z API
  const subjectId = "1"
  const categoryName = "Zajímavá kategorie"
  const subjectName = "ČZJ1"
  return (
      <Box sx={{display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center"}}>
        <Typography variant="h4">Aktualizovat kategorii {}</Typography>
        <CategoryForm subjects={[]} onSubmit={() => {}} submitText={"Aktualizovat"}
                      defaultName={categoryName} defaultSubjectId={subjectId} defaultSubjectName={subjectName}/>
      </Box>
  )
}
