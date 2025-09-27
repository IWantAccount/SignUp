import {SignCard, type SignCardProps} from "@/components/cards/sign-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";

interface Props {
    list: SignCardProps[];
}

export function SignGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map((sign) => (
                    <SignCard
                        signId={sign.signId}
                        fileName={sign.fileName}
                        categoryId={sign.categoryId}
                        categoryName={sign.categoryName}
                        translations={sign.translations}/>
                ))
            }
        </BaseGrid>
    )
}