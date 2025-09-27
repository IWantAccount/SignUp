import {UserCard, type UserCardProps} from "@/components/cards/user-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";

interface Props {
    list: UserCardProps[];
}

export function UserGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map((user) => (
                    <UserCard   id={user.id}
                                name={user.name}
                                email={user.email}
                                classname={user.classname}/>
                ))
            }
        </BaseGrid>
    )
}