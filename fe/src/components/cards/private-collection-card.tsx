import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

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
                {/*TODO nahradit routingem*/}
                <CardActionArea sx={{height: "100%"}} onClick={() => {console.log("jdeme na kolekci s id: " + collectionId)}}>
                    <CardContent>
                        <Typography variant="h5">{name}</Typography>
                    </CardContent>
                </CardActionArea>
        </Card>
    )
}
