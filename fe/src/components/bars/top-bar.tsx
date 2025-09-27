import {Toolbar, AppBar, Button, IconButton, Box, Slide, useScrollTrigger, CssBaseline} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import React from "react";
import {SideBar} from "@/components/bars/side-bar.tsx";

// Většinu kódu jsem převzal z oficiální dokumentace MUI: https://mui.com/material-ui/react-app-bar/
interface Props {
    window?: () => Window;
    children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
    const {children, window} = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div/>}
        </Slide>
    );
}

export function TopBar(props: Props){
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar position="static">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={ () => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            edge="start"
                            href={"/"}
                            aria-labe="domů">
                            <Box
                                component="img"
                                src="/neslhk_logo.png"
                                alt="Neslhk logo"
                                sx={{ height: 40 }}>

                            </Box>
                        </IconButton>
                        <Button color="inherit">Účet</Button>
                        <Button color="inherit">Nápověda</Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <SideBar open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
        </React.Fragment>
    );


}