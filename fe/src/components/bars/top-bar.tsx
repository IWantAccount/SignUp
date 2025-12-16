import {AppBar, Box, Button, CssBaseline, IconButton, Slide, Toolbar, useScrollTrigger} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import React from "react";
import {SideBar} from "@/components/bars/side-bar.tsx";
import {Link, useNavigate} from '@tanstack/react-router'
import {AuthService} from "@/api/util/auth-service.ts";

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

export function TopBar(props: Props) {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    return (
        <React.Fragment>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar position="static">
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <Box sx ={{display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap'}}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                                onClick={() => setDrawerOpen(true)}>
                                <MenuIcon/>
                            </IconButton>
                            <IconButton
                                edge="start"
                                component={Link} to={"/app/home"}
                                aria-labe="domů">
                                <Box
                                    component="img"
                                    src="/neslhk_logo.png"
                                    alt="Neslhk logo"
                                    sx={{height: 40}}>

                                </Box>
                            </IconButton>
                            <Button color="inherit"
                                    component={Link} to={`/app/users/${AuthService.getUserId()}`}>Účet</Button>
                            <Button color="inherit"
                                    component={Link} to={"/app/help-me"}>Nápověda</Button>
                            <Button color="inherit"
                                    component={Link} to={"/app/ondra-je-frajer"}>O systému</Button>
                        </Box>

                        <Button
                            color="inherit"
                            onClick={() => {
                                navigate({
                                    to: "/login"
                                })
                                AuthService.logout();
                            }}>Odhlásit se</Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
            <SideBar open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
        </React.Fragment>
    );


}