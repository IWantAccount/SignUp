import {SignComponentCard, type SignComponentCardProps} from "@/components/cards/sign-component-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";

interface Props {
    list: SignComponentCardProps[];
}

export function SignComponentGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map(signComponent => (
                    <SignComponentCard signComponentId={signComponent.signComponentId}
                                       description={signComponent.description}
                                       type={signComponent.type}/>
                ))
            }
        </BaseGrid>
    )
}