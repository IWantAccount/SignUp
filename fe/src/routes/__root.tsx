import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
    //Generováno pomocí https://bareynol.github.io/mui-theme-creator/
    palette: {
        mode: "light",
        primary: {
            main: '#1e99cb',
            light: '#63c5ea',
            dark: '#066f96',
        },
        secondary: {
            main: '#e75d25',
        },
        error: {
            main: '#cb2117',
            light: '#e8453a',
            dark: '#941008',
        },
    },
    spacing: 8,
})

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Outlet />
            <TanstackDevtools
                config={{ position: 'bottom-left' }}
                plugins={[
                    {
                        name: 'Tanstack Router',
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
        </ThemeProvider>
    ),
})
