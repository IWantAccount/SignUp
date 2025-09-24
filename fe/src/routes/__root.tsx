import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#20c3f5"
        },
        background: {
            //default: "#272a2b",
            //paper: "#1e1e1e"
        }
    },
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
