import {createFileRoute} from '@tanstack/react-router'
import {useQuery} from "@tanstack/react-query";
import {createGetSignByIdOptions} from "@/api/sign/sign-query-options.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {UpdateSignForm} from "@/components/forms/update-sign-form.tsx";

export const Route = createFileRoute('/app/signs/$signId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const signId = Route.useParams().signId;
    const query = useQuery(createGetSignByIdOptions(signId));

    if(query.isPending) return <BackdropLoading/>
    if(query.isError) return <></>

    return <UpdateSignForm signId={signId} defaultDto={query.data}/>
}
