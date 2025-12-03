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

interface DialogProps {
    signId: string;
    open: boolean;
    onClose: () => void;
}

export function AddSignToCollectionDialog(props: DialogProps) {
    const [searchItem, setSearchItem] = useState<string>("");
    const [debounded] = useDebounce(searchItem, 300);
    const itemQuery = useInfiniteQuery(createCollectionSignSearch({
        collectionName: debounded,
        ownerId: "dc500556-e5d4-480b-b117-b1a1731ad636", //TODO nahraď
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