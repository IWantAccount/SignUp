import {Box} from "@mui/material";
interface Props {
    children?: React.ReactNode;
}
export function BaseGrid({children}: Props) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {children}
        </Box>
    )
}