import {Toolbar, AppBar, Button, IconButton, Box, Slide, useScrollTrigger, CssBaseline} from "@mui/material";
import React from "react";

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
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar position="static">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
                        <IconButton
                            edge="start"
                            href={"/"}
                            aria-labe="domů">
                            <Box
                                component="img"
                                src="../../public/neslhk_logo.png"
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
        </React.Fragment>
    );


}