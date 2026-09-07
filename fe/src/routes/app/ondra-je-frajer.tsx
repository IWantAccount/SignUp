import {createFileRoute} from '@tanstack/react-router'
import {Link, Stack} from "@mui/material";
import {TitleAndParagraph} from "@/components/util/title-and-paragraph.tsx";

export const Route = createFileRoute('/app/ondra-je-frajer')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
            <Stack spacing={4} sx={{p: 2}}>
                <TitleAndParagraph
                title="O systému"
                paragraph="Tento systém vzniknul jako bakalářská práce na Fakultě informatiky MUNI. Vývoj dále probíhá tzv.
                open-source, tedy s otevřeným zdrojovým kódem. Je možné tento kód v souladu s licencí upravovat, používat a šířit.
                S trochou technické zručnosti je tak možné vzít zdrojový kód a pustit si ho u sebe na počítači,
                případně spustit veřejně celou novou verzi webu."/>
                <Link href="https://github.com/IWantAccount/SignUp">odkaz na zdrojové kódy</Link>
            </Stack>
    )
}

