import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {useState} from "react";
import {Box, Button, Chip, Grid, IconButton, Paper, Stack, Tab, Tabs, Typography} from "@mui/material";
import {createGetSignByIdOptions} from "@/api/sign/sign-query-options.ts";
import {useQuery} from '@tanstack/react-query';
import type {SignGetDetailDto} from "@/api/sign/sign-dtos.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {signTypeToCzech} from "@/domain/sign-type.ts";
import {buildFilePath} from "@/api/util/build-path.ts";
import {regionToCzech} from "@/domain/region.ts";
import {AddSignToCollectionDialog} from "@/components/dialogs/add-sign-to-collection-dialog.tsx";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import {AuthService} from "@/api/util/auth-service.ts";
import EditIcon from "@mui/icons-material/Edit";

export const Route = createFileRoute('/app/signs/$signId/')({
    component: RouteComponent,
})

//Layout stránky jsem vytvořil s využitím ChatGPT (model 5.1, OpenAI)
function RouteComponent() {
    const [selectedTab, setSelectedTab] = useState<"base" | "notation">("base");
    const signId = Route.useParams().signId;
    const signQuery = useQuery(createGetSignByIdOptions(signId));
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    if (signQuery.isPending) return <BackdropLoading/>
    if (signQuery.isError) return <></>;
    const sign: SignGetDetailDto = signQuery.data;


    return (
        <Stack sx={{alignItems: "center", gap: 4}}>
            <Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    value={selectedTab}
                    onChange={(_, newValue) => setSelectedTab(newValue)}>
                    <Tab value="base" label="Základní informace"/>
                    <Tab value="notation" label="Notace"/>
                </Tabs>
                <ZoomTooltip title={"uložit"}>
                    <IconButton onClick={() => setDialogOpen(true)}>
                        <TurnedInNotIcon fontSize="large"/>
                    </IconButton>
                </ZoomTooltip>
                {
                    AuthService.atLeastTeacher() && (
                        <ZoomTooltip title={"upravit"}>
                            <IconButton onClick={() => {
                                navigate({
                                    to: `/app/signs/${signId}/edit`,
                                })
                            }}>
                                <EditIcon/>
                            </IconButton>
                        </ZoomTooltip>
                    )
                }
            </Box>
            {selectedTab === "base" && <Base sign={sign}/>}

            {selectedTab === "notation" && <Notation sign={sign}/>}
            <AddSignToCollectionDialog signId={signId} open={dialogOpen} onClose={() => setDialogOpen(false)}/>
        </Stack>
    )
}

function SpaceBetweenFlexBox(props: { children: React.ReactNode }) {
    return (
        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            {props.children}
        </Box>
    )
}

function TextAssignmentNotation({label, value}: {
    label: string
    value?: string
}) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "minmax(180px, 1fr) minmax(0, 1fr)",
                },
                gap: {
                    xs: 0.5,
                    sm: 2,
                },
                width: "100%",
                alignItems: "baseline",
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{fontWeight: 500}}
            >
                {label}
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontWeight: 500,
                    overflowWrap: "anywhere",
                }}
            >
                {value ?? "nevyplněno"}
            </Typography>
        </Box>
    )
}

function TextAssignmentBase(props: { label: string, value?: string }) {
    return (
        <SpaceBetweenFlexBox>
            <Typography variant="h6">{props.label}</Typography> <Typography
        variant="h6">{props.value ?? "nevyplněno"}</Typography>
        </SpaceBetweenFlexBox>)

}

function Notation({sign}: { sign: SignGetDetailDto }) {
    const {notation} = sign

    return (
        <Box
            sx={{
                display: "grid",
                padding: 2,
                maxWidth: 1200,
                gridTemplateColumns: {
                    xs: "1fr",
                    md: notation.bothHandsUsed
                        ? "minmax(0, 1fr) minmax(0, 1fr)"
                        : "minmax(0, 700px)",
                },
                gap: {
                    xs: 3,
                    md: 6,
                },
                width: "100%",
                justifyContent: "center",
            }}
        >
            <Stack spacing={2}>
                <TextAssignmentNotation
                    label="Obouruční znak"
                    value={notation.bothHandsUsed ? "Ano" : "Ne"}
                />

                {notation.bothHandsUsed && (
                    <TextAssignmentNotation
                        label="Asymetrický znak"
                        value={notation.asymmetricSign ? "Ano" : "Ne"}
                    />
                )}

                <TextAssignmentNotation
                    label="Tvar dominantní ruky"
                    value={notation.activeHandNotation.handShape?.textDescription}
                />

                <TextAssignmentNotation
                    label="Orientace dlaně dominantní ruky"
                    value={notation.activeHandNotation.palmOrientation?.textDescription}
                />

                <TextAssignmentNotation
                    label="Orientace prstů dominantní ruky"
                    value={notation.activeHandNotation.fingerOrientation?.textDescription}
                />

                <TextAssignmentNotation
                    label="Místo artikulace"
                    value={notation.articulationLocation?.textDescription}
                />

                <TextAssignmentNotation
                    label="Pohyb"
                    value={notation.movement?.textDescription}
                />

                <TextAssignmentNotation
                    label="Dotek"
                    value={notation.contact?.textDescription}
                />

                <TextAssignmentNotation
                    label="Vzájemná poloha rukou"
                    value={notation.handArrangement?.textDescription}
                />
            </Stack>

            {notation.bothHandsUsed && (
                <Stack spacing={2}>
                    <TextAssignmentNotation
                        label="Tvar nedominantní ruky"
                        value={notation.passiveHandNotation?.handShape?.textDescription}
                    />

                    <TextAssignmentNotation
                        label="Orientace dlaně nedominantní ruky"
                        value={notation.passiveHandNotation?.palmOrientation?.textDescription}
                    />

                    <TextAssignmentNotation
                        label="Orientace prstů nedominantní ruky"
                        value={notation.passiveHandNotation?.fingerOrientation?.textDescription}
                    />
                </Stack>
            )}
        </Box>
    )
}

function Base({sign}: { sign: SignGetDetailDto }) {
    return (
        <Stack sx={{gap: 2, alignItems: "center", padding: 2}}>
            <Grid container spacing={4} sx={{width: "100%", maxWidth: 1200}}>
                <Grid size={{xs: 12, md: 8}}>
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

                <Grid size={{xs: 12, md: 4}}>
                    <Paper sx={{p: 3, borderRadius: 2}}>
                        <Stack sx={{alignItems: "center", gap: 4}}>
                            <TextAssignmentBase label={"Typ znaku"} value={signTypeToCzech(sign.signType)}/>
                            <SpaceBetweenFlexBox>
                                <Typography variant="h6">Kategorie:</Typography>
                                <Button component={Link}
                                        to={`/app/categories/${sign.category.id}`}>{sign.category.name}</Button>
                            </SpaceBetweenFlexBox>
                            <TextAssignmentBase label={"Region"} value={regionToCzech(sign.region)}/>
                            <TextAssignmentBase label={"RRZJ"} value={sign.languageLevel}/>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{width: "100%", maxWidth: 1200}}>
                <Grid size={{xs: 12, md: 8}}>
                    <Typography variant="h6">Možné překlady:</Typography>
                    <Box sx={{width: "100%", display: "flex", gap: 1, flexWrap: "wrap"}}>
                        {
                            sign.translations.map((translation) => (
                                <Chip label={translation}/>
                            ))
                        }
                    </Box>
                </Grid>
                <Grid size={{xs: 12, md: 8}}>
                    <Box sx={{
                        width: "100%",
                        borderRadius: 2,
                    }}
                    >
                        {
                            sign.explanation && (
                                <Stack>
                                    <Typography variant="body1" sx={{whiteSpace: "pre-wrap"}}>
                                        Vysvětlení:
                                    </Typography>
                                    <Typography variant="body1" sx={{whiteSpace: "pre-wrap"}}>
                                        {sign.explanation}
                                    </Typography>
                                </Stack>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    )
}
