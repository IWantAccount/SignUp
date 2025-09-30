import { SignComponentForm } from '@/components/forms/sign-component-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/sign-components/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <SignComponentForm  header={"Vytvořit komponentu znaku"}
                          onSubmit={
                            (data) => {
                                //TODO api call
                                console.log(data)
                            }
                          }
                          submitButtonText={"Uložit"}
                          renderType={true}/>
  )
}
