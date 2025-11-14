import {Box, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ZoomTooltip} from "@/components/util/zoom-tooltip.tsx";

interface Props {
    title: string;
    onEditNavigate?: () => void;
    onDelete?: () => void;
    onSearch?: (newValue: string) => void;
}

export function SearchableCardSectionTopBarActions({title, onEditNavigate, onDelete, onSearch}: Props) {

    return (
        <Toolbar sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
            width: "100%"
        }}>
            <Typography variant="h6">{title}</Typography>
            <div>
                {
                    onEditNavigate && (
                        <ZoomTooltip title={"upravit"}>
                            <IconButton onClick={onEditNavigate}>
                                <EditIcon/>
                            </IconButton>
                        </ZoomTooltip>
                    )
                }
                {
                    onDelete && (
                        <ZoomTooltip title={"smazat"}>
                            <IconButton onClick={onDelete}>
                                <DeleteForeverIcon/>
                            </IconButton>
                        </ZoomTooltip>
                    )
                }
            </div>
            {
                onSearch && (
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "right", flexWrap: "wrap", gap: 1}}>
                        <TextField variant="outlined" label="hledat" onChange={(e) => onSearch(e.target.value)} />
                    </Box>
                )
            }

        </Toolbar>
    )
}