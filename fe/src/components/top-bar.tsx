import {Toolbar, AppBar, Button, IconButton, Box} from "@mui/material";
//TODO jak nastavit barvy? Co search app bar?
export function TopBar(){
    return (
        <AppBar position="static">
            <Toolbar>
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
                <Button color="inherit">Tři</Button>
            </Toolbar>
        </AppBar>
    )
}