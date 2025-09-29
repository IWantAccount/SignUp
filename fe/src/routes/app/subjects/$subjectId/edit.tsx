import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";

export const Route = createFileRoute('/app/subjects/$subjectId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  //TODO tohle načíst z API
  const name = "ČZJ1";

  return (
      <NameForm defaultName={name}
                header={"Aktualizovat předmět"}
                submitButtonText={"Aktualizovat"}
                onSubmit={
                  (data) => {
                    //TODO api call
                    console.log(data)
                  }
                }/>
  )
}
