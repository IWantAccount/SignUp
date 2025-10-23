import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "@tanstack/react-router";
import {componentTypeToCzech, type SignComponentTypeEnum} from "@/domain/sign-component-type-enum.ts";

export interface SignComponentCardProps {
    signComponentId: string;
    description: string;
    type: SignComponentTypeEnum;
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
                        <Typography variant="body2">Druh: {componentTypeToCzech(type)}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}