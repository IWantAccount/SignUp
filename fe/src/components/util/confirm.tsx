import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    text?: string;
}

export function Confirm(props: Props) {
    const title = props.title ?? "Opravdu?";
    const text = props.text ?? "Tuto akci nelze vrátit zpět.";

    const handleConfirm = () => {
        props.onConfirm();
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.onClose}>
                    Zrušit
                </Button>

                <Button
                    onClick={handleConfirm}
                    color="error"
                    variant="contained"
                >
                    Potvrdit
                </Button>
            </DialogActions>
        </Dialog>
    );
}