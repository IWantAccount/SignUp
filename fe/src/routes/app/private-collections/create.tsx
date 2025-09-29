import { NameForm } from '@/components/forms/name-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/private-collections/create')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <NameForm header={"Vytvořit soukromou kolekci"}
                  onSubmit={
                    (data) => {
                        //TODO api call
                        console.log(data)
                    }
                  }
                  submitButtonText={"Uložit"}/>
    )
}
