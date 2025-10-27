import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {
    PrivateCollectionGetListDto
} from "@/api/private-collection/private-collection-dtos.ts";

export function PrivateCollectionCard(dto: PrivateCollectionGetListDto) {
    return (
        <Card sx={{
            minWidth: 200,
            minHeight: 100,
        }}>
                <CardActionArea sx={{height: "100%"}}
                                component={Link} to={`/app/private-collections/${dto.id}/`}>
                    <CardContent>
                        <Typography variant="h5">{dto.name}</Typography>
                    </CardContent>
                </CardActionArea>
        </Card>
    )
}
