import {createFileRoute} from '@tanstack/react-router'
import {CategoryForm} from "@/components/forms/category-form.tsx";
import {Box, Typography} from "@mui/material";

export const Route = createFileRoute('/app/categories/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center"}}>
            <Typography variant="h5">Vytvořit novou kategorii</Typography>
            <CategoryForm subjects={[]} onSubmit={() => {/*TODO api call*/
            }} submitButtonText={"Uložit"}/>
        </Box>
    )
}
