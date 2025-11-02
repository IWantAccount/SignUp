import {Box, Card, CardActionArea, CardContent, IconButton, Skeleton, Typography} from "@mui/material";
import {Link, useNavigate} from "@tanstack/react-router";
import type {
    PrivateCollectionGetListDto
} from "@/api/private-collection/private-collection-dtos.ts";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createDeleteCollectionByIdOptions} from "@/api/private-collection/private-collection-query-options.ts";

export function PrivateCollectionCard(dto: PrivateCollectionGetListDto) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(createDeleteCollectionByIdOptions(dto.id, queryClient))

    return (
        <Card sx={{ minWidth: 200, minHeight: 100 }}>
            {mutation.isPending ? (
                <CardContent>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="rectangular" width="80%" />
                </CardContent>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center",
                            px: 1,
                        }}
                    >
                        <IconButton
                            onClick={() => navigate({ to: `/app/private-collections/${dto.id}/edit/` })}
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => mutation.mutate(dto.id)}>
                            <ClearIcon />
                        </IconButton>
                    </Box>

                    <CardActionArea
                        sx={{ height: "100%" }}
                        component={Link}
                        to={`/app/private-collections/${dto.id}/`}
                    >
                        <CardContent>
                            <Typography variant="h5">{dto.name}</Typography>
                        </CardContent>
                    </CardActionArea>
                </>
            )}
        </Card>

    )
}
