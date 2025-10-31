import {useMutation, useQueryClient, type UseMutationOptions} from "@tanstack/react-query";
import {useState} from "react";
import {Alert, Slide, Snackbar} from "@mui/material";

type SnackBarType = "success" | "error";

interface MutationSnackBarState {
    open: boolean;
    type: SnackBarType;
    msg: string;
}

export function useMutationWithSnackBar<Data, Error, Variables>(
    queryKey: string[],
    options: UseMutationOptions<Data, Error, Variables>,
    successMessage?: string,
) {
    const [snack, setSnack] = useState<MutationSnackBarState>({ open: false, type: "success", msg: "" });
    const queryClient = useQueryClient();


    const mutation = useMutation<Data, Error, Variables>({
        mutationFn: options.mutationFn,
        ...options,
        onSuccess: () => {
            setSnack({ open: true, type: "success", msg: successMessage || "Povedlo se7" });
            queryClient.invalidateQueries({ queryKey });
        },
        onError: () => {
            setSnack({ open: true, type: "error", msg: "Nastala chyba" });
        }
    });

    const SnackBarComponent = (
        <Snackbar
            open={snack.open}
            autoHideDuration={5000}
            onClose={() => setSnack(prev => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={(props) => <Slide {...props} direction="down"></Slide>}
        >
            <Alert
                severity={snack.type}
                variant="filled"
                sx={{ width: "100%"}}
            >
                {snack.msg}
            </Alert>
        </Snackbar>
    );

    return { mutation, SnackBarComponent };

}