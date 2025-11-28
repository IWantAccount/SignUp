import {createFileRoute, Link} from '@tanstack/react-router'
import {useState} from "react";
import {Box, Button, Chip, Grid, Paper, Stack, Tab, Tabs, Typography} from "@mui/material";
import {createGetSignByIdOptions} from "@/api/sign/sign-query-options.ts";
import { useQuery } from '@tanstack/react-query';
import type {SignGetDetailDto} from "@/api/sign/sign-dtos.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {signTypeToCzech} from "@/domain/sign-type.ts";
import {buildFilePath} from "@/api/util/build-path.ts";
import {regionToCzech} from "@/domain/region.ts";

export const Route = createFileRoute('/app/signs/$signId/')({
    component: RouteComponent,
})

//Layout stránky jsem vytvořil s využitím ChatGPT (model 5.1, OpenAI)
function RouteComponent() {
    const [selectedTab, setSelectedTab] = useState<"base" | "notation">("base");
    const signId = Route.useParams().signId;
    const signQuery = useQuery(createGetSignByIdOptions(signId));
    if(signQuery.isPending) return <BackdropLoading/>
    if(signQuery.isError) return <></>;
    const sign: SignGetDetailDto = signQuery.data;

    return (
        <Stack sx={{alignItems: "center", gap: 4}}>
            <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={selectedTab}
                onChange={(_, newValue) => setSelectedTab(newValue)}>
                <Tab value="base" label="Základní informace"/>
                <Tab value="notation" label="Notace"/>
            </Tabs>
            {selectedTab === "base" && <Base sign={sign}/>}

            {selectedTab === "notation" && <Notation sign={sign}/>}
        </Stack>
    )
}

function SpaceBetweenFlexBox(props: {children: React.ReactNode}) {
    return (
        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            {props.children}
        </Box>
    )
}

function TextAssigment(props: {label: string, value: string}) {
    return (
        <SpaceBetweenFlexBox>
            <Typography variant="h6">{props.label}</Typography>
            <Typography variant="h6">{props.value}</Typography>
        </SpaceBetweenFlexBox>
    )
}

function Notation({ sign }: { sign: SignGetDetailDto }) {
    return (
        <Box sx={{display: "flex", flexDirection: "row", gap: 8, width: "100%", justifyContent: "center"}}>
            <Stack sx={{gap: 2, alignItems: "center", width: "45%"  }}>
                <TextAssigment label={"Obouruční znak: "} value={sign.notation.bothHandsUsed ? "Ano" : "Ne"}/>
                {sign.notation.bothHandsUsed && <TextAssigment label={"Asymetrický znak: "} value={sign.notation.asymmetricSign ? "Ano" : "Ne"}/>}

                <TextAssigment label={"Tvar dominantní ruky: "} value={sign.notation.activeHandNotation.handShape?.textDescription ?? ""}/>
                <TextAssigment label={"Orientace dlaně dominantní ruky: "} value={sign.notation.activeHandNotation.palmOrientation?.textDescription ?? ""}/>
                <TextAssigment label={"Orientace prstů dominantní ruky: "} value={sign.notation.activeHandNotation.fingerOrientation?.textDescription ?? ""}/>
                <TextAssigment label={"Místo artikulace: "} value={sign.notation.articulationLocation?.textDescription ?? ""}/>
                <TextAssigment label={"Pohyb: "} value={sign.notation.movement?.textDescription ?? ""}/>
                <TextAssigment label={"Dotek: "} value={sign.notation.contact?.textDescription ?? ""}/>
                <TextAssigment label={"Vzájemná poloha rukou: "} value={sign.notation.handArrangement?.textDescription ?? ""}/>

            </Stack>
            {sign.notation.bothHandsUsed && (
                <Stack sx={{gap: 2, alignItems: "center", width: "45%" }}>
                    <TextAssigment label={"Tvar nedominantní ruky: "} value={sign.notation.passiveHandNotation?.handShape?.textDescription ?? ""}/>
                    <TextAssigment label={"Orientace dlaně nedominantní ruky: "} value={sign.notation.passiveHandNotation?.palmOrientation?.textDescription ?? ""}/>
                    <TextAssigment label={"Orientace prstů nedominantní ruky: "} value={sign.notation.passiveHandNotation?.fingerOrientation?.textDescription ?? ""}/>
                </Stack>
            )}
        </Box>
    )
}

function Base({ sign }: { sign: SignGetDetailDto }) {
    return (
        <Stack sx={{gap: 2, alignItems: "center"}}>
            <Grid container spacing={4} sx={{ width: "100%", maxWidth: 1200 }}>
                <Grid size={8}>
                    <Box
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: 4,
                        }}
                    >
                        <video
                            src={buildFilePath(sign.videoFileName)}
                            controls
                            muted
                            style={{
                                width: "100%",
                                display: "block",
                            }}
                        />
                    </Box>
                </Grid>

                <Grid size={4}>
                    <Paper sx={{ p:3, borderRadius: 2}}>
                        <Stack sx={{alignItems: "center", gap: 4}}>
                            <TextAssigment label={"Typ znaku"} value={signTypeToCzech(sign.signType)}/>
                            <SpaceBetweenFlexBox>
                                <Typography variant="h6">Kategorie:</Typography>
                                <Button component={Link} to={`/app/categories/${sign.category.id}`}>{sign.category.name}</Button>
                            </SpaceBetweenFlexBox>
                            <TextAssigment label={"Region"} value={regionToCzech(sign.region)}/>
                            <TextAssigment label={"RRZJ"} value={sign.languageLevel}/>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ width: "100%", maxWidth: 1200 }}>
                <Grid size={8}>
                    <Typography variant="h6">Možné překlady:</Typography>
                    <Box sx={{width: "100%", display: "flex", gap: 1, flexWrap: "wrap"}}>
                        {
                            sign.translations.map((translation) => (
                                <Chip label={translation}/>
                            ))
                        }
                    </Box>
                </Grid>
                <Grid size={4}>
                    <Box sx={{
                        width: "100%",
                        borderRadius: 2,
                    }}
                    >
                        <Stack>

                            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                                Vysvětlení:
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                                {sign.explanation}
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    )
}
