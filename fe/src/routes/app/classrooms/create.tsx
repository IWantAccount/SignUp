import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";

export const Route = createFileRoute('/app/classrooms/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <NameForm header={"Založit třídu"}
                onSubmit={
                    (data) => {
                        //TODO api call
                        console.log(data)
                    }
                }
                submitButtonText={"Uložit"}/>
  )
}
