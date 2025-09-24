import {Toolbar, AppBar, Button} from "@mui/material";
//TODO jak nastavit barvy? Co search app bar?
export function TopBar(){
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit">Účet</Button>
                <Button color="inherit">Nápověda</Button>
                <Button color="inherit">Tři</Button>
            </Toolbar>
        </AppBar>
    )
}