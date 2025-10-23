import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";

export const Route = createFileRoute('/app/subjects/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <NameForm   header={"Vytvořit předmět"}
                  onSubmit={
                        (data) => {
                            //TODO api call
                          console.log(data)
                        }
                  }
                  submitButtonText={"Uložit"} />
  )
}
