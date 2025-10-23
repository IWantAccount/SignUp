import { createFileRoute } from '@tanstack/react-router'
import {NameForm} from "@/components/forms/name-form.tsx";

export const Route = createFileRoute(
  '/app/private-collections/$collectionId/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const name = "Moje kolekce";
  return (
      <NameForm defaultName={name}
                header={"Přejmenovat soukromou kolekci"}
                submitButtonText={"Přejmenovat"}
                onSubmit={
                  (data) => {
                    //TODO api call
                    console.log(data)
                  }
                }/>
  )
}
