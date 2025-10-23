import { createFileRoute } from '@tanstack/react-router'
import type {UserCardProps} from "@/components/cards/user-card.tsx";
import {UserGrid} from "@/components/grids/user-grid.tsx";

export const Route = createFileRoute('/app/classrooms/$classroomId/')({
  component: RouteComponent,
})

function RouteComponent() {
  //TODO api call, nějaký tlačítka na přídání a odebrání uživatele
  const classname = "VOŠ1";
  const users: UserCardProps[] = [
    {
      id: "1",
      name: "Máňa",
      email: "mana@neco.com",
      classname: classname
    },
    {
      id: "2",
      name: "Honza",
      email: "jan.nezajimavy@neco.com",
      classname: classname
    },
    {
      id: "3",
      name: "Ignác",
      email: "ignac@blbyjmeno.com",
      classname: classname
    }
  ]

  return (
      <UserGrid list={users}/>
  )
}
