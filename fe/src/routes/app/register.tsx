import { createFileRoute } from '@tanstack/react-router'
import {UserComponentForm} from "@/components/forms/user-component-form.tsx";

export const Route = createFileRoute('/app/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserComponentForm onSubmit={
    (data) => {
        console.log(data)
    }
  }/>
}
