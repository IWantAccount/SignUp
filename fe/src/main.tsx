import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {enqueueSnackbar, SnackbarProvider} from "notistack";

// Import the generated route tree
import {routeTree} from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {formatError} from "@/api/util/format-error.ts";

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            enqueueSnackbar("Něco se pokazilo querycache:" + formatError(error), {variant: "error"});
        },
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            enqueueSnackbar("Něco se pokazilo:" + formatError(error), {variant: "error"});
        },
        onSuccess: () => {
            enqueueSnackbar("Povedlo se", {variant: "success"});
        }
    })
});

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider maxSnack={5} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                                  autoHideDuration={5000}>
                    <RouterProvider router={router}/>
                </SnackbarProvider>
            </QueryClientProvider>
        </StrictMode>,
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
