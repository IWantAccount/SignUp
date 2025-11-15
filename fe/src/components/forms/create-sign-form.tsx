import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Checkbox, Chip, FormControlLabel, Switch, Tab, Tabs, TextField} from "@mui/material";
import {SignComponentAutocomplete} from "@/components/util/sign-component-autocomplete.tsx";
import {signComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";
import { useState } from "react";
import {EnumAutocomplete} from "@/components/util/enum-autocomplete.tsx";
import {regionEnum, regionToCzech} from "@/domain/region.ts";
import {languageLevelEnum} from "@/domain/language-level.ts";
import {signTypeEnum, signTypeToCzech} from "@/domain/sign-type.ts";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import {CategoryAutocomplete} from "@/components/util/category-autocomplete.tsx";
import type {SignCreateDto} from "@/api/sign/sign-dtos.ts";
import {enqueueSnackbar} from "notistack";

const schema = z.object({
    categoryId: z.string().min(1, "Kategorie je povinná"),
    activeHandShapeId: z.string().nullable(),
    activeHandPalmOrientationId: z.string().nullable(),
    activeHandFingerOrientationId: z.string().nullable(),
    passiveHandShapeId: z.string().nullable(),
    passiveHandPalmOrientationId: z.string().nullable(),
    passiveHandFingerOrientationId: z.string().nullable(),
    locationId: z.string().nullable(),
    movementId: z.string().nullable(),
    contactId: z.string().nullable(),
    handArrangementId: z.string().nullable(),
    region: regionEnum,
    languageLevel: languageLevelEnum,
    signType: signTypeEnum,
    explanation: z.string().nullable(),
    translations: z.array(z.string().trim().min(1, "Překled nesmí být prázdný").max(100, "Překlad nesmí být delší než 100 znaků")),
    bothHandsUsed: z.boolean(),
    asymmetricSign: z.boolean(),
})

export type CreateSignFormData = z.infer<typeof schema>

interface Props {
    onSubmit: (dto: SignCreateDto, video: File) => void;
    submitButtonText: string;
    disableSubmit: boolean;
}

export function CreateSignForm(props: Props) {
    const {control, handleSubmit} = useForm<CreateSignFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            translations: []
        }
    });

    const [selectedTab, setSelectedTab] = useState<"base" | "notation">("base");
    const [twoHandedSign, setTwoHandedSign] = useState<boolean>(false);
    const [newTranslation, setNewTranslation] = useState<string>("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const onSubmitRHF: SubmitHandler<CreateSignFormData> = (data) => {
        const resDto: SignCreateDto = {
            categoryId: data.categoryId,
            type: data.signType,
            languageLevel: data.languageLevel,
            region: data.region,
            translations: data.translations,
            explanation: data.explanation || undefined,
            notation: {
                bothHandsUsed: data.bothHandsUsed,
                asymmetricSign: data.asymmetricSign,
                activeHandNotation: {
                    handShapeId: data.activeHandShapeId || undefined,
                    palmOrientationId: data.activeHandPalmOrientationId || undefined,
                    fingerOrientationId: data.activeHandFingerOrientationId || undefined,
                },
                passiveHandNotation: data.bothHandsUsed ? {
                    handShapeId: data.passiveHandShapeId || undefined,
                    palmOrientationId: data.passiveHandPalmOrientationId || undefined,
                    fingerOrientationId: data.passiveHandFingerOrientationId || undefined,
                } : undefined,
                articulationLocationId: data.locationId || undefined,
                movementId: data.movementId || undefined,
                contactId: data.contactId || undefined,
                handArrangementId: data.handArrangementId || undefined,
            }

        }

        if(!videoFile) {
            enqueueSnackbar("Je potřeba nahrát video soubor znaku", {variant: "warning"});
            return;
        }
        props.onSubmit(resDto, videoFile);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmitRHF, (errors) => {
                console.log("VALIDATION ERRORS", errors);
            })}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                px: 5,
                py: 2,
                maxWidth: 500,
                mx: "auto",
                width: "100%",
                boxSizing: "border-box",
            }}>
            <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={selectedTab}
                onChange={(_, newValue) => setSelectedTab(newValue)}>
                <Tab value="base" label="Základní informace"/>
                <Tab value="notation" label="Notace znaku"/>
            </Tabs>
            {selectedTab === "base" && (
                    <>
                        {/*Upload videa psal také chatgpt*/}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                component="label">
                                Nahrát video
                                <input
                                    type="file"
                                    accept="video/*"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;
                                        setVideoFile(file);
                                    }}
                                />
                            </Button>

                            {videoFile && (
                                <Box sx={{ mt: 1, fontSize: 14 }}>
                                    Vybrané video: <strong>{videoFile.name}</strong>
                                </Box>
                            )}
                        </Box>
                        <CategoryAutocomplete label={"Kategorie"} name={"categoryId"} control={control} required={true}/>
                        <EnumAutocomplete
                            name={"region"}
                            control={control}
                            label="Místo užívání znaku"
                            options={regionEnum.options}
                            getOptionLabel={(value) => regionToCzech(value)}/>

                        <EnumAutocomplete
                            name={"languageLevel"}
                            control={control}
                            label={"RRZJ"}
                            options={languageLevelEnum.options}
                            getOptionLabel={(value) => value}/>

                        <EnumAutocomplete
                            name={"signType"}
                            control={control}
                            label={"Typ znaku"}
                            options={signTypeEnum.options}
                            getOptionLabel={(value) => signTypeToCzech(value)}
                            required={true}/>
                        <Controller name="explanation"
                                    control={control}
                                    render={({field, fieldState}) => (
                                        <TextField
                                            {...field}
                                            label="Vysvětlení"
                                            multiline
                                            minRows={4}
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}/>
                                    )}/>

                        {/*Tento kontroler je převzatý z chatgpt (model 5.1 od OpenAI)*/}
                        <Controller
                            name={"translations"}
                            control={control}
                            render={({field, fieldState}) => {
                                const values: string[] = field.value ?? [];

                                const addTranslation = () => {
                                    const trimmed = newTranslation.trim();
                                    if (!trimmed) return;
                                    field.onChange([...values, trimmed]);
                                    setNewTranslation("");
                                };

                                const removeTranslation = (index: number) => {
                                    field.onChange(values.filter((_, i) => i !== index));
                                };

                                return (
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                                        <TextField
                                            label="Přidat překlad"
                                            value={newTranslation}
                                            onChange={(e) => setNewTranslation(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addTranslation();
                                                }
                                            }}
                                            helperText={
                                                fieldState.error?.message ??
                                                "Napiš překlad a potvrď Enterem."
                                            }
                                            error={!!fieldState.error}
                                        />

                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            {values.map((translation, index) => (
                                                <ZoomTooltip title={"odebrat"}>
                                                    <Chip
                                                        key={`${translation}-${index}`}
                                                        label={translation}
                                                        onDelete={() => removeTranslation(index)}
                                                    />
                                                </ZoomTooltip>
                                            ))}
                                        </Box>
                                    </Box>
                                );
                            }}/>
                    </>
                    )
            }
            {selectedTab === "notation" && (
                    <>
                        <Box sx={{display: "flex", flexDirection: "row"}}>
                            <Controller
                                name="bothHandsUsed"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={twoHandedSign}
                                                    onChange={(_, checked) => {
                                                        setTwoHandedSign(checked);
                                                        field.onChange(checked);
                                                    }}
                                                />
                                            }
                                            label="Obouruční znak"
                                        />
                                    );
                                }}
                            />
                            {twoHandedSign && (
                                <Controller
                                    name={"asymmetricSign"}
                                    control={control}
                                    render={({field}) => {
                                        return (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={field.value}
                                                        onChange={(_, checked) => field.onChange(checked)}
                                                    />
                                                }
                                                label={"Asymetrický znak"}
                                            />
                                        )
                                    }}/>
                            )}
                        </Box>
                        <SignComponentAutocomplete label={"Tvar dominantní ruky"} signComponentType={signComponentTypeEnum.enum.HAND_SHAPE} name={"activeHandShapeId"} control={control}/>
                        <SignComponentAutocomplete label={"Orientace dlaně dominantní ruky"} signComponentType={signComponentTypeEnum.enum.PALM_ORIENTATION} name={"activeHandPalmOrientationId"} control={control}/>
                        <SignComponentAutocomplete label={"Orientace prstů dominantní ruky"} signComponentType={signComponentTypeEnum.enum.FINGER_ORIENTATION} name={"activeHandFingerOrientationId"} control={control}/>
                        {
                            twoHandedSign && (
                                <>
                                    <SignComponentAutocomplete label={"Tvar nedominantní ruky"} signComponentType={signComponentTypeEnum.enum.HAND_SHAPE} name={"passiveHandShapeId"} control={control}/>
                                    <SignComponentAutocomplete label={"Orientace dlaně nedominantní ruky"} signComponentType={signComponentTypeEnum.enum.PALM_ORIENTATION} name={"passiveHandPalmOrientationId"} control={control}/>
                                    <SignComponentAutocomplete label={"Orientace prstů nedominantní ruky"} signComponentType={signComponentTypeEnum.enum.FINGER_ORIENTATION} name={"passiveHandFingerOrientationId"} control={control}/>
                                    <SignComponentAutocomplete label={"Vzájemná poloha rukou"} signComponentType={signComponentTypeEnum.enum.HAND_ARRANGEMENT} name={"handArrangementId"} control={control}/>
                                </>
                            )
                        }
                        <SignComponentAutocomplete label={"Místo artikulace"} signComponentType={signComponentTypeEnum.enum.LOCATION} name={"locationId"} control={control}/>
                        <SignComponentAutocomplete label={"Pohyb"} signComponentType={signComponentTypeEnum.enum.MOVEMENT} name={"movementId"} control={control}/>
                        <SignComponentAutocomplete label={"Dotek"} signComponentType={signComponentTypeEnum.enum.CONTACT} name={"contactId"} control={control}/>

                    </>
                    )
            }

            <Button variant="contained" type="submit" disabled={props.disableSubmit}>
                {props.submitButtonText}
            </Button>

        </Box>
    )
}

