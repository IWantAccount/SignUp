import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react";
import {type SignType, signTypeEnum, signTypeToCzech} from "@/domain/sign-type.ts";
import {languageLevelEnum, type LanguageLevelType} from "@/domain/language-level.ts";
import {type Region, regionEnum, regionToCzech} from "@/domain/region.ts";
import {useDebounce} from "use-debounce";
import type { SearchSignDto, SignGetListDto} from "@/api/sign/sign-dtos.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {createSignInfiniteSearch} from "@/api/sign/sign-query-options.ts";
import {MultipleCardSkeleton} from "@/components/util/multiple-card-skeleton.tsx";
import {SignGrid} from "@/components/grids/sign-grid.tsx";
import {Autocomplete, Box, Button, Stack, TextField} from "@mui/material";
import {CategoryAutocomplete} from "@/components/util/category-autocomplete.tsx";
import {EnumAutocomplete} from "@/components/util/EnumAutocomplete.tsx";
import {SignComponentAutocomplete} from "@/components/util/sign-component-autocomplete.tsx";
import {signComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";

export const Route = createFileRoute('/app/home')({
    component: RouteComponent,
})

function RouteComponent() {
    const [filtersHidden, setFiltersHidden] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [type, setType] = useState<SignType | null>(null);
    const [languageLevel, setLanguageLevel] = useState<LanguageLevelType | null>(null);
    const [region, setRegion] = useState<Region | null>(null);

    const [bothHandsUsed, setBothHandsUsed] = useState<boolean | null>(null);
    const [asymmetricSign, setAsymmetricSign] = useState<boolean | null>(null);

    const [activeShapeId, setActiveShapeId] = useState<string | null>(null);
    const [activeFingerId, setActiveFingerId] = useState<string | null>(null);
    const [activePalmId, setActivePalmId] = useState<string | null>(null);

    const [passiveShapeId, setPassiveShapeId] = useState<string | null>(null);
    const [passiveFingerId, setPassiveFingerId] = useState<string | null>(null);
    const [passivePalmId, setPassivePalmId] = useState<string | null>(null);

    const [articulationId, setArticulationId] = useState<string | null>(null);
    const [movementId, setMovementId] = useState<string | null>(null);
    const [contactId, setContactId] = useState<string | null>(null);
    const [handArrangementId, setHandArrangementId] = useState<string | null>(null);

    const dto: SearchSignDto = {
        translationSearch: debouncedSearch,
        categoryId: categoryId,
        type: type,
        languageLevel: languageLevel,
        region: region,

        notation: {
            bothHandsUsed: bothHandsUsed ?? undefined,
            asymmetricSign: asymmetricSign ?? undefined,
            activeHandNotation: {
                handShapeId: activeShapeId ?? undefined,
                fingerOrientationId: activeFingerId ?? undefined,
                palmOrientationId: activePalmId ?? undefined,
            },
            passiveHandNotation: {
                handShapeId: passiveShapeId ?? undefined,
                fingerOrientationId: passiveFingerId ?? undefined,
                palmOrientationId: passivePalmId ?? undefined,
            },
            articulationLocationId: articulationId ?? undefined,
            movementId: movementId ?? undefined,
            contactId: contactId ?? undefined,
            handArrangementId: handArrangementId ?? undefined,
        }

    }

    const query = useInfiniteQuery(createSignInfiniteSearch(dto));
    const signs: SignGetListDto[] = query.data?.pages.flatMap(page => page.content) ?? [];


    return (
        <Stack sx={{margin: 5}} spacing={2} alignItems="center">
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 2}}>
                <TextField variant="outlined" label="Překlad" onChange={(e) => setSearch(e.currentTarget.value)}/>
                <Button variant="contained" onClick={() => setFiltersHidden(!filtersHidden)}>
                    {filtersHidden ? "Zobrazit filtry" : "Skrýt filtry"}
                </Button>
            </Box>
            {!filtersHidden && (
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "stretch", gap: 4, flexWrap: "wrap", width: "100%"}}>
                    <Stack spacing={1} sx={{minWidth: 250, maxWidth: 550, flex: 1}}>

                        <Autocomplete<boolean | null, false, false, false>
                        options={boolOptions}
                        value={bothHandsUsed}
                        onChange={(_, v) => setBothHandsUsed(v ?? null)}
                        getOptionLabel={boolToLabel}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={"Obouruční znak"}
                            />
                        )}/>

                        <Autocomplete<boolean | null, false, false, false>
                        options={boolOptions}
                        value={asymmetricSign}
                        onChange={(_, v) => setAsymmetricSign(v)}
                        getOptionLabel={boolToLabel}
                        renderInput={(param) => (
                            <TextField
                                {...param}
                                label={"Asymetrický znak"}
                            />
                        )}/>

                        <CategoryAutocomplete label={"Kategorie"} value={categoryId} onChange={setCategoryId}/>
                        <EnumAutocomplete<SignType | null>
                            label={"Typ znaku"}
                            options={signTypeEnum.options}
                            getOptionLabel={(option) => {
                                if (option === null) return "";
                                return signTypeToCzech(option);
                            }}
                            value={type}
                            onChange={(newVal) => setType(newVal)}/>
                            <EnumAutocomplete<LanguageLevelType | null>
                                label={"RRZJ"}
                                options={languageLevelEnum.options}
                                getOptionLabel={(option) => {
                                    if (option === null) return "";
                                    return option;
                                }}
                                value={languageLevel}
                                onChange={(newVal) => setLanguageLevel(newVal)}/>
                        <EnumAutocomplete
                            label={"Region"}
                            options={regionEnum.options}
                            getOptionLabel={(option) => {
                                if (option === null) return "";
                                return regionToCzech(option);
                            }}
                            value={region}
                            onChange={(newVal) => setRegion(newVal)}/>
                    </Stack>
                    <Stack spacing={1} sx={{minWidth: 250, maxWidth: 550, flex: 1}}>
                        <SignComponentAutocomplete
                            label={"Tvar dominantní ruky"}
                            signComponentType={signComponentTypeEnum.enum.HAND_SHAPE}
                            value={activeShapeId}
                            onChange={(newVal) => setActiveShapeId(newVal)}/>
                        <SignComponentAutocomplete
                            label={"Orientace prstů dominantní ruky"}
                            signComponentType={signComponentTypeEnum.enum.FINGER_ORIENTATION}
                            value={activeFingerId}
                            onChange={(newVal) => setActiveFingerId(newVal)}/>
                        <SignComponentAutocomplete
                            label={"Orientace dlaně dominantní ruky"}
                            signComponentType={signComponentTypeEnum.enum.PALM_ORIENTATION}
                            value={activePalmId}
                            onChange={(newVal) => setActivePalmId(newVal)}/>

                        <SignComponentAutocomplete
                            label={"Tvar nedominantní ruky"}
                            signComponentType={signComponentTypeEnum.enum.HAND_SHAPE}
                            value={passiveShapeId}
                            onChange={(newVal) => setPassiveShapeId(newVal)}/>
                        <SignComponentAutocomplete
                            label={"Orientace prstů nedominantní ruky"}
                            signComponentType={signComponentTypeEnum.enum.FINGER_ORIENTATION}
                            value={passiveFingerId}
                            onChange={(n) => setPassiveFingerId(n)}/>
                        <SignComponentAutocomplete
                            label={"Orientace dlaně nedominantní ruky"}
                            signComponentType={signComponentTypeEnum.enum.PALM_ORIENTATION}
                            value={passivePalmId}
                            onChange={(n) => setPassivePalmId(n)}/>

                        <SignComponentAutocomplete
                            label={"Místo artikulace"}
                            signComponentType={signComponentTypeEnum.enum.LOCATION}
                            value={articulationId}
                            onChange={(n) => setArticulationId(n)}/>
                        <SignComponentAutocomplete
                            label={"Pohyb"}
                            signComponentType={signComponentTypeEnum.enum.MOVEMENT}
                            value={movementId}
                            onChange={(n) => setMovementId(n)}/>
                        <SignComponentAutocomplete
                            label={"Dotek"}
                            signComponentType={signComponentTypeEnum.enum.CONTACT}
                            value={contactId}
                            onChange={(n) => setContactId(n)}/>
                        <SignComponentAutocomplete
                            label={"Vzájemná poloha rukou"}
                            signComponentType={signComponentTypeEnum.enum.HAND_ARRANGEMENT}
                            value={handArrangementId}
                            onChange={(n) => setHandArrangementId(n)}/>
                    </Stack>
                </Box>
            )}
            {query.isPending ? <MultipleCardSkeleton/> : <SignGrid list={signs}/>}
            <Button
                variant="outlined"
                onClick={() => query.fetchNextPage()}
                disabled={!query.hasNextPage || query.isFetchingNextPage}
                sx={{maxWidth: 200}}>
                {
                    !query.hasNextPage ?
                        "Vše načteno" :
                        query.isFetchingNextPage ? "Načítání..." : "Načíst další"
                }
            </Button>
        </Stack>
    )
}

const boolToLabel = (v: boolean | null) => {
    if (v === true) return "Ano";
    if (v === false) return "Ne";
    return "Je to jedno";
};

const boolOptions: (boolean | null)[] = [true, false, null];