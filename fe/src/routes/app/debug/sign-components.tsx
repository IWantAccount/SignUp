import { Box } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import {SignComponentCard} from "@/components/cards/sign-component-card.tsx";

export const Route = createFileRoute('/app/debug/sign-components')({
  component: RouteComponent,
})

function RouteComponent() {
    const components = Array.from({ length: 20 }).map((_, i) => ({
        signComponentId: i.toString(),
        description: "component " + i.toString(),
        type: i % 2 === 0 ? "HANDSHAPE" : "MOVEMENT"
    }))

    return <>
        <h1>Zkouška výpisu komponent</h1>
        <Box sx={{display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap"}}>
            {
                components.map(component => (
                    <SignComponentCard signComponentId={component.signComponentId} description={component.description}
                        type={component.type}>
                    </SignComponentCard>
                ))
            }
        </Box>
    </>
}
