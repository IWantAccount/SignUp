import {createFileRoute} from '@tanstack/react-router'
import {Box} from "@mui/material";
import {PrivateCollectionCard} from "@/components/cards/private-collection-card.tsx";

export const Route = createFileRoute('/app/debug/private-collections')({
    component: RouteComponent,
})

function RouteComponent() {
    const collections = Array.from({length: 20}, (_, i) => ({
        id: i,
        name: "kolekce č. " + i.toString()
    }))

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap"}}>
                {
                    collections.map((collection) => (
                        <PrivateCollectionCard collectionId={collection.id.toString()} name={collection.name}></PrivateCollectionCard>
                    ))
                }
            </Box>
        </>
    )
}
