import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TopBarItemsGrid} from "@/components/grids/top-bar-items-grid.tsx";
import {SearchableCardSectionTopBarActions} from "@/components/bars/searchable-card-section-top-bar-actions.tsx";
import {SignGrid} from '@/components/grids/sign-grid';
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createGetCollectionByIdOptions,
    privateCollectionQueryKey
} from "@/api/private-collection/private-collection-query-options.ts";
import {deleteCollectionById} from '@/api/private-collection/private-collection-api';
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import { useState } from 'react';
import {useDebounce} from "use-debounce";
import {createSignInfiniteSearch} from "@/api/sign/sign-query-options.ts";
import type {SignGetListDto} from "@/api/sign/sign-dtos.ts";
export const Route = createFileRoute('/app/private-collections/$collectionId/')(
    {
        component: RouteComponent
    },
)

function RouteComponent() {
    const collectionId = Route.useParams().collectionId;
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => deleteCollectionById(collectionId),
        onSuccess: async () => {
            navigate({
                to: "/app/private-collections",
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            queryClient.invalidateQueries({queryKey: [privateCollectionQueryKey]});
        }
    })

    const collectionQuery = useQuery(createGetCollectionByIdOptions(collectionId));
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebounce(search, 300);
    const signsQuery = useInfiniteQuery(createSignInfiniteSearch({translationSearch: debouncedSearch, collectionId: collectionId}));
    if (collectionQuery.isPending) return <BackdropLoading/>;
    if(collectionQuery.isError || signsQuery.isError) return <></>;

    const signs: SignGetListDto[] = signsQuery.data?.pages.flatMap(page => page.content) || [];

    return (
        <>
            <TopBarItemsGrid>
                <SearchableCardSectionTopBarActions
                    title={
                        collectionQuery.data.name
                    }
                    onSearch={
                        (searchData) => {
                            setSearch(searchData);
                        }
                    }
                    onDelete={
                        () => {
                            mutation.mutate()
                        }
                    }
                    onEditNavigate={
                        () => {
                            navigate({
                                to: '/app/private-collections/$collectionId/edit',
                                params: {collectionId},
                            })
                        }
                    }/>
                <SignGrid list={signs}/>
            </TopBarItemsGrid>
        </>
    )
}
