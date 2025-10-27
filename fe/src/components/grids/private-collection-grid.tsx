import {PrivateCollectionCard} from "@/components/cards/private-collection-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";
import type {
    PrivateCollectionGetListDto
} from "@/api/private-collection/private-collection-dtos.ts";

interface Props {
    list: PrivateCollectionGetListDto[];
}

export function PrivateCollectionGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map(collection => (
                    <PrivateCollectionCard key={collection.id} {...collection} />
                ))
            }
        </BaseGrid>
    )
}