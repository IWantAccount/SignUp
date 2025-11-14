import {Box, Card, CardContent, Skeleton} from "@mui/material";

//Převzato z chatgpt (OpenAI, model 5.1)
export function MultipleCardSkeleton({count = 16}) {
    return (
        <Box display="flex" gap={2} flexWrap="wrap">
            {Array.from({length: count}).map((_, i) => (
                <Card key={i} sx={{maxWidth: 345, minWidth: 150, width: 220}}>
                    <Skeleton variant="rectangular" height={140}/>
                    <CardContent>
                        <Skeleton height={30} width="70%"/>
                        <Skeleton height={20} width="90%"/>
                        <Skeleton height={20} width="80%"/>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
