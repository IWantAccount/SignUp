import { SignComponentForm } from '@/components/forms/sign-component-form';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/sign-components/$componentId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  //TODO API call
  const defaultDescription: string = "B2";

  return (
      <SignComponentForm  header={"Upravit komponentu"}
                          defaultDescription={defaultDescription}
                          onSubmit={
                              ({ description, type }) => {
                                  console.log(description);
                              }
                          }
                          submitButtonText={"Upravit"}
                          renderType={false}/>
  )
}
