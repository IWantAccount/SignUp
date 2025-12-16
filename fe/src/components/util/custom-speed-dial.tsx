import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import type {ReactElement} from "react";

export interface SpeedDialActionItem {
    icon: ReactElement;
    name: string;
    action: () => void;
}

interface Props {
    actions: SpeedDialActionItem[];
    ariaLabel?: string;
}

export function CustomSpeedDial(props: Props) {
    return (
        <SpeedDial ariaLabel={props.ariaLabel ?? "SpeedDial"}
        sx={{position: 'fixed', bottom: 16, right: 16}}
        icon={<SpeedDialIcon/>}>
            {
                props.actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}/>
                ))
            }
        </SpeedDial>
    )
}