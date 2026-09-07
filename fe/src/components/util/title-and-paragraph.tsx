import {Stack, Typography} from "@mui/material";

export interface titleAndParagraphProps {
    title: string;
    paragraph: string;
}
export function TitleAndParagraph({title, paragraph}: titleAndParagraphProps) {
    return (
        <Stack spacing={2}>
            <Typography variant={"subtitle1"}>{title}</Typography>
            <Typography variant={"body2"}>{paragraph}</Typography>
        </Stack>
)
}