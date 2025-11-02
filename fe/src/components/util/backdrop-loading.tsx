import {Backdrop, CircularProgress} from "@mui/material";

export function BackdropLoading() {
    return <Backdrop open={true}>
        <CircularProgress color="secondary"/>
    </Backdrop>
}