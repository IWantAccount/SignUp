import type {SignInCollectionDto} from "@/api/private-collection/private-collection-dtos.ts";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    createAddSignToCollectionOptions, createCollectionSignSearch,
    createRemoveSignFromCollectionOptions
} from "@/api/private-collection/private-collection-query-options.ts";
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import {useDebounce} from "use-debounce";
import {BaseDialog} from "@/components/dialogs/base-dialog.tsx";
import {AuthService} from "@/api/util/auth-service.ts";

interface DialogProps {
    signId: string;
    open: boolean;
    onClose: () => void;
}

export function AddSignToCollectionDialog(props: DialogProps) {
    const [seeOthersCollections, setSeeOthersCollections] = useState<boolean>(false);
    const ownerId: string | undefined = seeOthersCollections ? undefined : AuthService.getUserId();
    const [searchItem, setSearchItem] = useState<string>("");
    const [debounded] = useDebounce(searchItem, 300);
    const itemQuery = useInfiniteQuery(createCollectionSignSearch({
        collectionName: debounded,
        ownerId: ownerId,
        signId: props.signId
    }))

    if (itemQuery.isError) return <></>
    const dataToDisplay: SignInCollectionDto[]
        = itemQuery.data?.pages.flatMap((page) => page.content) ?? [];

    return (
        <BaseDialog
            onClose={props.onClose}
            open={props.open}
            onSearchChange={(search: string) => {setSearchItem(search)}}
            title={"Přidat znak do kolekce"}
            searchPlaceholder={"Hledat kolekci podle názvu"}
            queryIsPending={itemQuery.isPending}
            fetchNextPage={itemQuery.fetchNextPage}
            checkboxLabel={
                AuthService.atLeastAdmin() ? "Zobrazit cizí kolekce" : undefined
            }
            checkboxChecked={
                seeOthersCollections
            }
            checkboxActions={
                AuthService.atLeastAdmin() ? () => {
                    setSeeOthersCollections(!seeOthersCollections)
                } : undefined
            }
            fetchButtonText={
                itemQuery.hasNextPage ?
                    (itemQuery.isPending ? "Čekejte" : "Načíst další") :
                    "Vše načteno"
            }
            fetchButtonDisabled={itemQuery.isPending || !itemQuery.hasNextPage}>
            {
                dataToDisplay.map(searchResDto => (
                    <DialogListItem
                        signId={searchResDto.signId}
                        collectionName={searchResDto.collectionName}
                        collectionId={searchResDto.collectionId}
                        signPresentInCollection={searchResDto.signPresentInCollection}/>
                ))
            }
        </BaseDialog>
    )
}

function DialogListItem(props: SignInCollectionDto) {

    const queryClient = useQueryClient();
    const addSignToCollectionMutation = useMutation(createAddSignToCollectionOptions(props, queryClient));
    const removeSignFromCollectionMutation = useMutation(createRemoveSignFromCollectionOptions(props, queryClient));

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 1.5 }}>
            <Typography>{props.collectionName}</Typography>
            {
                (addSignToCollectionMutation.isPending || removeSignFromCollectionMutation.isPending) ? (
                    <CircularProgress color="secondary"/>
                ) :
                    props.signPresentInCollection ? (
                            <ZoomTooltip title={"Odebrat znak z kolekce"}>
                                <IconButton onClick={() => {
                                    removeSignFromCollectionMutation.mutate();
                                }}>
                                    <ClearIcon/>
                                </IconButton>
                            </ZoomTooltip>
                    ) :
                    (
                        <ZoomTooltip title={"Přidat znak do kolekce"}>
                            <IconButton onClick={() => {
                                addSignToCollectionMutation.mutate()
                            }}>
                                <AddIcon/>
                            </IconButton>
                        </ZoomTooltip>
                    )
            }

        </Box>
    )
}