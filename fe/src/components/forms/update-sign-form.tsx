import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createUpdateSignOptions} from "@/api/sign/sign-query-options.ts";
import type {SignGetDetailDto} from "@/api/sign/sign-dtos.ts";
import z from "zod";
import {regionEnum, regionToCzech} from "@/domain/region.ts";
import {languageLevelEnum} from "@/domain/language-level.ts";
import {signTypeEnum, signTypeToCzech} from "@/domain/sign-type.ts";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {CreateSignFormData} from "@/components/forms/create-sign-form.tsx";
import {useState} from "react";
import type {SignUpdateDto} from "@/api/sign/sign-dtos.ts";
import {Box, Button, Checkbox, Chip, FormControlLabel, Switch, Tab, Tabs, TextField} from "@mui/material";
import {CategoryFormAutocomplete} from "@/components/util/category-form-autocomplete.tsx";
import {EnumFormAutocomplete} from "@/components/util/enum-form-autocomplete.tsx";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import {SignComponentFormAutocomplete} from "@/components/util/sign-component-form-autocomplete.tsx";
import {signComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";
import {Link, useNavigate} from "@tanstack/react-router";

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
    region: regionEnum.nullable(),
    languageLevel: languageLevelEnum.nullable(),
    signType: z.enum(signTypeEnum.options, "Typ znaku je povinný"),
    explanation: z.string().max(255, "Maximálně 255 znaků").nullable(),
    translations: z.array(z.string().trim().min(1, "Překled nesmí být prázdný").max(100, "Překlad nesmí být delší než 100 znaků")).min(1, "Je potřeba zadat alespoň jeden překlad. Překlad potvrďte klávesou Enter."),
    bothHandsUsed: z.boolean(),
    asymmetricSign: z.boolean()
})

export type UpdateSignFormData = z.infer<typeof schema>

interface Props {
    signId: string;
    defaultDto: SignGetDetailDto;
}

export function UpdateSignForm({signId, defaultDto}: Props)  {
    const {control, handleSubmit} = useForm<UpdateSignFormData>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            categoryId: defaultDto.category.id,
            explanation: defaultDto.explanation,
            translations: defaultDto.translations,
            activeHandShapeId: defaultDto.notation.activeHandNotation.handShape?.id || null,
            activeHandPalmOrientationId: defaultDto.notation.activeHandNotation.palmOrientation?.id || null,
            activeHandFingerOrientationId: defaultDto.notation.activeHandNotation.fingerOrientation?.id || null,
            passiveHandShapeId: defaultDto.notation.passiveHandNotation?.handShape?.id || null,
            passiveHandPalmOrientationId: defaultDto.notation.passiveHandNotation?.palmOrientation?.id || null,
            passiveHandFingerOrientationId: defaultDto.notation.passiveHandNotation?.fingerOrientation?.id || null,
            locationId: defaultDto.notation.articulationLocation?.id || null,
            movementId: defaultDto.notation.movement?.id || null,
            contactId: defaultDto.notation.contact?.id || null,
            handArrangementId: defaultDto.notation.handArrangement?.id || null,
            bothHandsUsed: defaultDto.notation.bothHandsUsed,
            asymmetricSign: defaultDto.notation.asymmetricSign,
            languageLevel: defaultDto.languageLevel,
            region: defaultDto.region,
            signType: defaultDto.signType
        }
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(createUpdateSignOptions(signId, queryClient, navigate));

    const [selectedTab, setSelectedTab] = useState<"base" | "notation">("base");
    const [twoHandedSign, setTwoHandedSign] = useState<boolean>(false);
    const [newTranslation, setNewTranslation] = useState<string>("");

    const onSubmitRHF: SubmitHandler<CreateSignFormData> = (data) => {
        const dto: SignUpdateDto = {
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
        mutation.mutate(dto);
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
                    <Button
                        component={Link}
                        to={`/app/signs/${signId}/replace-video`}>
                        Nahrát nové video
                    </Button>
                    <CategoryFormAutocomplete label={"Kategorie"} name={"categoryId"} control={control} required={true}/>
                    <EnumFormAutocomplete
                        name={"region"}
                        control={control}
                        label="Místo užívání znaku"
                        options={regionEnum.options}
                        getOptionLabel={(value) => regionToCzech(value)}/>

                    <EnumFormAutocomplete
                        name={"languageLevel"}
                        control={control}
                        label={"RRZJ"}
                        options={languageLevelEnum.options}
                        getOptionLabel={(value) => value}/>

                    <EnumFormAutocomplete
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
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={field.value ?? false}
                                            onChange={(_, checked) => {
                                                field.onChange(checked);
                                                setTwoHandedSign(checked);
                                            }}

                                        />
                                    }
                                    label="Obouruční znak"
                                />
                            )}
                        />
                        {twoHandedSign && (
                            <Controller
                                name="asymmetricSign"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={field.value ?? false}
                                                onChange={(_, checked) => field.onChange(checked)}
                                            />
                                        }
                                        label="Asymetrický znak"
                                    />
                                )}
                            />
                        )}
                    </Box>
                    <SignComponentFormAutocomplete label={"Tvar dominantní ruky"} signComponentType={signComponentTypeEnum.enum.HAND_SHAPE} name={"activeHandShapeId"} control={control}/>
                    <SignComponentFormAutocomplete label={"Orientace dlaně dominantní ruky"} signComponentType={signComponentTypeEnum.enum.PALM_ORIENTATION} name={"activeHandPalmOrientationId"} control={control}/>
                    <SignComponentFormAutocomplete label={"Orientace prstů dominantní ruky"} signComponentType={signComponentTypeEnum.enum.FINGER_ORIENTATION} name={"activeHandFingerOrientationId"} control={control}/>
                    {
                        twoHandedSign && (
                            <>
                                <SignComponentFormAutocomplete label={"Tvar nedominantní ruky"} signComponentType={signComponentTypeEnum.enum.HAND_SHAPE} name={"passiveHandShapeId"} control={control}/>
                                <SignComponentFormAutocomplete label={"Orientace dlaně nedominantní ruky"} signComponentType={signComponentTypeEnum.enum.PALM_ORIENTATION} name={"passiveHandPalmOrientationId"} control={control}/>
                                <SignComponentFormAutocomplete label={"Orientace prstů nedominantní ruky"} signComponentType={signComponentTypeEnum.enum.FINGER_ORIENTATION} name={"passiveHandFingerOrientationId"} control={control}/>
                                <SignComponentFormAutocomplete label={"Vzájemná poloha rukou"} signComponentType={signComponentTypeEnum.enum.HAND_ARRANGEMENT} name={"handArrangementId"} control={control}/>
                            </>
                        )
                    }
                    <SignComponentFormAutocomplete label={"Místo artikulace"} signComponentType={signComponentTypeEnum.enum.LOCATION} name={"locationId"} control={control}/>
                    <SignComponentFormAutocomplete label={"Pohyb"} signComponentType={signComponentTypeEnum.enum.MOVEMENT} name={"movementId"} control={control}/>
                    <SignComponentFormAutocomplete label={"Dotek"} signComponentType={signComponentTypeEnum.enum.CONTACT} name={"contactId"} control={control}/>

                </>
            )
            }

            <Button variant="contained" type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Čekejte" : "Uložit"}
            </Button>

        </Box>
    )

}