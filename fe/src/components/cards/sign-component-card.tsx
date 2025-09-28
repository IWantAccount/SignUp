import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";

export interface SignComponentCardProps {
    signComponentId: string;
    description: string;
    type: string;
}

export function SignComponentCard({signComponentId, description, type}: SignComponentCardProps) {
    return (
        <Card sx={{
            minWidth: 200,
        }}>
            <CardActionArea component={Link} to={`/app/sign-components/${signComponentId}/`}>
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