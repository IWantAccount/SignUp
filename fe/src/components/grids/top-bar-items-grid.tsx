import {Box} from "@mui/material";

interface Props {
    children?: React.ReactNode;
}

export function TopBarItemsGrid({children}: Props) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', m: 1, gap: 2, alignItems: 'center'}}>
            {children}
        </Box>
    )
}