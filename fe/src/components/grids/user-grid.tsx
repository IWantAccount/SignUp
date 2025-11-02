import {UserCard} from "@/components/cards/user-card.tsx";
import {BaseGrid} from "@/components/grids/base-grid.tsx";
import type {UserGetListDto} from "@/api/user/user-dtos.ts";

interface Props {
    list: UserGetListDto[];
}

export function UserGrid({list}: Props) {
    return (
        <BaseGrid>
            {
                list.map((user) => (
                    <UserCard   id={user.id}
                                name={user.name}
                                email={user.email}
                                classroomName={user.classroomName}
                                role={user.role}/>
                ))
            }
        </BaseGrid>
    )
}