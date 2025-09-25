import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";

interface Props {
    signComponentId: string;
    description: string;
    type: string;
}

export function SignComponentCard({signComponentId, description, type}: Props) {
    return (
        <Card sx={{
            minWidth: 200,
        }}>
            <CardActionArea onClick={() => {console.log("jdeme na komponentu s id: " + signComponentId)}}>
                <CardContent>
                    <Stack>
                        <Typography variant="body2">Popis: {description}</Typography>
                        {/*TODO ty typy jsou v angličtině a velkým písmem. Udělej nějakej switch, co to přeloží*/}
                        <Typography variant="body2">Druh: {type}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}