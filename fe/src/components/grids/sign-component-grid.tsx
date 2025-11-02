import {SignComponentCard} from "@/components/cards/sign-component-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";
import type {SignComponentGetListDto} from "@/api/sign-component/sign-component-dtos.ts";

interface Props {
    list: SignComponentGetListDto[];
}

export function SignComponentGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map(signComponent => (
                    <SignComponentCard textDescription={signComponent.textDescription} type={signComponent.type}
                                       id={signComponent.id}/>
                ))
            }
        </BaseGrid>
    )
}