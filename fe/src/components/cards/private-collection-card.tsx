import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";

export interface PrivateCollectionCardProps {
    collectionId: string;
    name: string;
    //TODO co třeba počet znaků v kolekci? Potřeba změnit i na be
}

export function PrivateCollectionCard({collectionId, name}: PrivateCollectionCardProps) {
    return (
        <Card sx={{
            minWidth: 200,
            minHeight: 100,
        }}>
                <CardActionArea sx={{height: "100%"}}
                                component={Link} to={`/app/private-collections/${collectionId}/`}>
                    <CardContent>
                        <Typography variant="h5">{name}</Typography>
                    </CardContent>
                </CardActionArea>
        </Card>
    )
}
