import { Stack } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import {TitleAndParagraph} from "@/components/util/title-and-paragraph.tsx";

export const Route = createFileRoute('/app/help-me')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <Stack spacing={4} sx={{p: 2}}>
        <TitleAndParagraph
            title="Předměty"
            paragraph="Studenti vidí pouze předměty, které jim učitel zapsal. Ostatní uživatelé vidí všechny předměty.
            Studenti ale mohou nahlížet do všech kategorií a znaků"/>
        <TitleAndParagraph
            title="Znaky"
            paragraph="Znaky je možné vyhledávat podle textového překladu. Dále je možné znaky filtrovat (záložka Znaky, zobrazit filtry) podle řady parametrů, například notace znaku.
            Ukáží se jenom ty znaky, které vyhovují všem filtrům"/>
        <TitleAndParagraph
            title="Soukromé kolekce znaků"
            paragraph="Každý uživatel si může už existující znaky sám organizovat v tzv. soukromých kolekcích. Tyto kolekce vidí jen uživatel, který je vytvořil.
            Můžeme například vytvořit kolekci se jménem 'Příprava tlumočení praktický lékař' a do ní přidat znaky, které mohou být během tohoto tlumočení užitečné.
            Přidání znaku to existující soukromé kolekce se dělá ikonou záložky, která je viditelná u znaků. Jeden znak můžeme mít v několika různých kolekcích."/>
      </Stack>
  )
}
