import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/app/ondra-je-frajer')({
    component: RouteComponent,
})

function RouteComponent() {
    return <p>Tady bude budoucnu bude sepsané info o tomhle systému, proč vznikl, že vznikl jako součást BP, že má otevřený zdrojový kód a tak dále</p>
}
