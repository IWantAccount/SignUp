import {createFileRoute, Link} from '@tanstack/react-router'
import {Button} from "@mui/material";
import logo from '../logo.svg'
import '../App.css'

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button component={Link} to="/app">proklik</Button>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/routes/index.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <a
                    className="App-link"
                    href="https://tanstack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn TanStack
                </a>
            </header>
        </div>
    )
}
