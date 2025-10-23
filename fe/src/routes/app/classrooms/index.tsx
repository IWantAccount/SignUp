import { createFileRoute } from '@tanstack/react-router'
import {ClassroomGrid} from "@/components/grids/classroom-grid.tsx";
import type {ClassroomCardProps} from "@/components/cards/classroom-card.tsx";

export const Route = createFileRoute('/app/classrooms/')({
  component: RouteComponent,
})

function RouteComponent() {
    //generate random classrooms
    const list: ClassroomCardProps[] = Array.from({length: 20}, (_, i) => ({
        classroomId: i.toString(),
        name: "classroom number: " + i.toString(),
        studentCount: i * 5

    }))
  return (
      //TODO change
      <>
          <h2>Test</h2>
          <ClassroomGrid list={list}/>
      </>
  )
}
