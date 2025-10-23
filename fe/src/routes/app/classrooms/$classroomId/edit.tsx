import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";

export const Route = createFileRoute('/app/classrooms/$classroomId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  //TODO api
  const name = "Defaultní jméno třídy";
  return (
      <NameForm defaultName={name}
                header={"Přejmenovat třídu"}
                submitButtonText={"Přejmenovat"}
                onSubmit={
                  (data) => {
                    console.log(data)
                  }
                }/>
  )
}
