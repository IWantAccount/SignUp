import {SignCard} from "@/components/cards/sign-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";
import type {SignGetListDto} from "@/api/sign/sign-dtos.ts";

interface Props {
    list: SignGetListDto[];
}

export function SignGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map((sign) => (
                    <SignCard videoFileName={sign.videoFileName} category={sign.category} translations={sign.translations} id={sign.id}/>
                ))
            }
        </BaseGrid>
    )
}