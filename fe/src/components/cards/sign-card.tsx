import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Skeleton,
    Stack
} from "@mui/material";
import {Link} from "@tanstack/react-router";
import type {SignGetListDto} from "@/api/sign/sign-dtos.ts";
import {buildFilePath} from "@/api/util/build-path.ts";
import {createDeleteSignOptions} from "@/api/sign/sign-query-options.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import ClearIcon from "@mui/icons-material/Clear";


export function SignCard(props: SignGetListDto) {
    const queryClient = useQueryClient();

    const mutation = useMutation(createDeleteSignOptions(props.id, queryClient))

    return mutation.isPending ? <CardSkeleton/> : (
        <Card sx={{
            minWidth: 200,
            maxWidth: 350,
            //padding: 1
        }}> <CardMedia
            component="video"
            muted
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
                <CardActions sx={{justifyContent: "space-between"}}>
                    <Button component={Link} to={`/app/signs/${props.id}/`}>
                        Detail
                    </Button>
                    <ZoomTooltip title={"smazat"}>
                        <IconButton onClick={() => mutation.mutate()}>
                            <ClearIcon/>
                        </IconButton>
                    </ZoomTooltip>
                </CardActions>
            </CardActionArea>

        </Card>
    )
}

//Generoval ChatGPT 5.1 od OpenAI
function CardSkeleton() {
    return (
        <CardContent>
            <Stack spacing={1}>
                <Skeleton variant="rounded" width={120} height={32}/>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Skeleton variant="rounded" width={60} height={24}/>
                    <Skeleton variant="rounded" width={50} height={24}/>
                    <Skeleton variant="rounded" width={70} height={24}/>
                </Stack>
            </Stack>
        </CardContent>
    );
}