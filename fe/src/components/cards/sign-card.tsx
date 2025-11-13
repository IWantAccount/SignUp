import {Button, Card, CardActionArea, CardContent, CardMedia, Chip, Stack} from "@mui/material";
import {Link} from "@tanstack/react-router";

export interface SignCardProps {
    signId: string;
    fileName: string;
    categoryId: string;
    categoryName: string;
    translations: string[];
}

export function SignCard({signId, fileName, categoryId, categoryName, translations}: SignCardProps) {

    return (
        <Card sx={{
            minWidth: 200,
            maxWidth: 350,
        }}>                <CardMedia
                    component="video"
                    src={fileName}
                    controls
                    sx={{
                        width: "100%",
                        aspectRatio: "16 / 9"
                    }}
                >
                </CardMedia>
                <CardContent>
                    <Stack>
                        <Button component={Link} to={`/app/categories/${categoryId}`}>{categoryName}</Button>
                        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                            {translations.map((t, i) => (
                                <Chip key={i} label={t} size="small"/>
                            ))}
                        </Stack>
                    </Stack>
                </CardContent>
            <CardActionArea>
                <Button component={Link} to={`/app/signs/${signId}/`}>
                    Detail
                </Button>
            </CardActionArea>

        </Card>
    )
}