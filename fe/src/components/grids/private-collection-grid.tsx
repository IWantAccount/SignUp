import {PrivateCollectionCard, type PrivateCollectionCardProps} from "@/components/cards/private-collection-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";

interface Props {
    list: PrivateCollectionCardProps[];
}

export function PrivateCollectionGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map( collection => (
                    <PrivateCollectionCard  collectionId={collection.collectionId}
                                            name={collection.name}/>
                ))
            }
        </BaseGrid>
    )
}