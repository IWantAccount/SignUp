import {Button, Card, CardActionArea, CardContent, CardMedia, Chip, Stack} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {SignGetListDto} from "@/api/sign/sign-dtos.ts";
import {buildFilePath} from "@/api/util/build-path.ts";


export function SignCard(props: SignGetListDto) {

    return (
        <Card sx={{
            minWidth: 200,
            maxWidth: 350,
            //padding: 1
        }}>                <CardMedia
                    component="video"
                    src={buildFilePath(props.videoFileName)}
                    controls
                    sx={{
                        width: "100%",
                        aspectRatio: "16 / 9"
                    }}
                >
                </CardMedia>
                <CardContent>
                    <Stack>
                        <Button component={Link} to={`/app/categories/${props.category.id}`}>{props.category.name}</Button>
                        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                            {props.translations.map((t, i) => (
                                <Chip key={i} label={t} size="small"/>
                            ))}
                        </Stack>
                    </Stack>
                </CardContent>
            <CardActionArea>
                <Button component={Link} to={`/app/signs/${props.id}/`}>
                    Detail
                </Button>
            </CardActionArea>

        </Card>
    )
}