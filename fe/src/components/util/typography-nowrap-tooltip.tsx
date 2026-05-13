import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";
import {Typography} from "@mui/material";

interface Props {
    text: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "overline";
}

export function TypographyNowrapTooltip(props: Props) {
    return (
        <ZoomTooltip title={props.text}>
            <Typography
                variant={props.variant}
                noWrap
                sx = {{
                    width: "100%",
                    textAlign: "center"
                }}>{props.text}</Typography>
        </ZoomTooltip>
    )
}