import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {createCreateAnnouncementOptions} from "@/api/announcement/announcement-query-options.ts";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Box, Typography} from "@mui/material";
import {AnnouncementForm} from "@/components/forms/announcement-form.tsx";
import type {AnnouncementCreateDto} from "@/api/announcement/announcement-dtos.ts";

export const Route = createFileRoute('/app/announcements/create')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(createCreateAnnouncementOptions(queryClient, navigate))

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center"}}>
            <Typography variant="h5">Vytvořit novou kategorii</Typography>
            <AnnouncementForm
                onSubmit={(data: AnnouncementCreateDto) => mutation.mutate(data)}
                submitButtonText={
                    mutation.isPending ? "Čekejte" : "Uložit"
                }
                disableSubmit={mutation.isPending}/>
        </Box>
    )
}
