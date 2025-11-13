import {Tooltip, Zoom} from "@mui/material";

interface Props {
    title: string;
    children: React.ReactElement;
}

export function ZoomTooltip(props: Props) {
    return (
        <Tooltip    title={props.title}
                    slots={{transition: Zoom}}>
            {props.children}
        </Tooltip>
    )
}