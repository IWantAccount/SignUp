import {createFileRoute, useNavigate} from '@tanstack/react-router'
import '../App.css'

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    const navigate = useNavigate();
    navigate({
        to: '/app/home'
    })
}
