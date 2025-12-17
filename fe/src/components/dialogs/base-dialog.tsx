import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    List,
    Stack,
    TextField
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

interface Props {
    onClose: () => void;
    open: boolean;
    onSearchChange: (search: string) => void;
    title: string;
    searchPlaceholder: string;
    queryIsPending: boolean;
    fetchNextPage: () => void;
    fetchButtonText: string;
    fetchButtonDisabled: boolean;
    children: React.ReactNode;
    checkboxActions?: () => void;
    checkboxLabel?: string;
    checkboxChecked?: boolean;
}

//Převzato částečně z dokumentace komponenty Dialog a částečně z ChatGPT (model 5, OpenAI)
//https://mui.com/material-ui/react-dialog/
export function BaseDialog(props: Props) {
    return (
        <Dialog
        open={props.open}
        onClose={props.onClose}
        scroll="paper"
        maxWidth="lg"
        PaperProps={{ sx: { height: "80vh", display: "flex", width: 900, padding: "50px"} }}>

            <Box sx={{display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap"}}>
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                {
                    props.checkboxActions && (
                        <FormControlLabel
                            control={
                                <Checkbox   checked={props.checkboxChecked ?? false}
                                            onChange={props.checkboxActions}/>
                            }
                            label={props.checkboxLabel ?? ""}/>
                    )
                }
            </Box>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder={props.searchPlaceholder}
                onChange={(e) => props.onSearchChange(e.target.value)}
                autoFocus/>
            <DialogContent
            dividers
            sx={{ p: 0, display: "flex", flexDirection: "column" }}>
                <Stack>
                    <List>
                        {props.children}
                    </List>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.fetchNextPage()}
                    disabled={props.fetchButtonDisabled}
                    variant="outlined">
                    {props.fetchButtonText}
                </Button>
                <Button onClick={props.onClose}>{"Zavřít"}</Button>
            </DialogActions>
        </Dialog>
    )
}