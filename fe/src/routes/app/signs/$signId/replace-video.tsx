import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signQueryKey} from "@/api/sign/sign-query-options.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import {useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import {enqueueSnackbar} from "notistack";

export const Route = createFileRoute('/app/signs/$signId/replace-video')({
  component: RouteComponent,
})

function RouteComponent() {
    const signId = Route.useParams().signId;
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [video, setVideo] = useState<File | null>(null);
    const mutation = useMutation({
        mutationKey: [signQueryKey, "replace-video", signId],
        mutationFn: async () => {
            const formData = new FormData();
            if(video) {
                formData.append("video", video);
                await api.post(buildPath(["sign", "replace-video", signId]), formData, {headers: {"Content-Type": "multipart/form-data"}});
            }
            else {
                enqueueSnackbar("Není vybrané žádné video", {variant: "warning"})
            }
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({queryKey: [signQueryKey]});
            navigate({to: `/app/signs/${signId}`});
        }
    })
    return (
        <Stack spacing={2} width="100%" padding={3} alignItems="center">
            <Typography variant="h5">Nahrát nové video do existujícího znaku</Typography>
            <Box
            sx={{display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", gap: 2}}>
                <Button
                    variant="outlined"
                    component="label"
                    sx={{minWidth: 200}}>
                    {video ? "Nahrát jiné video" : "Nahrát video"}
                    <input
                        type="file"
                        accept="video/*"
                        hidden
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            setVideo(file);
                        }}
                    />
                </Button>
                {video && (
                    <Box sx={{ mt: 1, fontSize: 14 }}>
                        Vybrané video: <strong>{video.name}</strong>
                    </Box>
                )}
            </Box>
            <Button
                variant="contained"
                onClick={() => {
                    if(video) {
                        mutation.mutate();
                    }
                    else{
                        enqueueSnackbar("Není vybrané žádné video", {variant: "warning"})
                    }
                }}
                sx={{minWidth: 200}}>Uložit</Button>
        </Stack>
    )
}
