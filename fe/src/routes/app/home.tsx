import {Box, Card, CardActionArea, Stack, Typography} from '@mui/material'
import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useQuery} from "@tanstack/react-query";
import api from '@/api/universal/axios';
import {buildPath} from "@/api/util/build-path.ts";
import {BackdropLoading} from "@/components/util/backdrop-loading.tsx";
import {userQueryKey} from "@/api/user/user-query-options.ts";
import {signQueryKey} from "@/api/sign/sign-query-options.ts";
import {subjectQueryKey} from "@/api/subject/subject-query-options.ts";
import {categoryQueryKey} from "@/api/category/category-query-options.ts";
import GroupIcon from '@mui/icons-material/Group';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';


export const Route = createFileRoute('/app/home')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const homeInfoQuery = useQuery({
        queryKey: [userQueryKey, signQueryKey, subjectQueryKey, categoryQueryKey],
        queryFn: async () => {
            const res = await api.get<HomeInfoDto>(buildPath(["home-info"]));
            return res.data;
        }
    })
    if(homeInfoQuery.isPending) return <BackdropLoading/>
    if(homeInfoQuery.isError) return <></>

    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex", flexWrap: "wrap", width: "80%",
        justifyContent: "space-between", gap: 4, margin: "0 auto"}}>
            <Stack spacing={2}>
                <Typography variant="h3">Aktuality</Typography>
                <Typography variant="body1">TBD</Typography>
            </Stack>
            <Stack spacing={2}>
                <Card sx={{width: 300}}>
                    <CardActionArea sx={{padding: 4}} onClick={() => navigate({
                        to: "/app/users"
                    })}>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <GroupIcon fontSize="large"/>
                            <Typography variant="h4">Uživatelů: {homeInfoQuery.data.userCount}</Typography>
                        </Box>
                    </CardActionArea>
                </Card>

                <Card sx={{width: 300}}>
                    <CardActionArea sx={{padding: 4}} onClick={() => navigate({
                        to: "/app/signs"
                    })}>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <SignLanguageIcon fontSize="large"/>
                            <Typography variant="h4">Znaků: {homeInfoQuery.data.signCount}</Typography>
                        </Box>
                    </CardActionArea>
                </Card>
                <Card sx={{width: 300}}>
                    <CardActionArea sx={{padding: 4}} onClick={() => navigate({
                        to: "/app/subjects"
                    })}>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <SchoolIcon fontSize="large"/>
                            <Typography variant="h4">Předmětů: {homeInfoQuery.data.subjectCount}</Typography>
                        </Box>
                    </CardActionArea>
                </Card>

                <Card sx={{width: 300}}>
                    <CardActionArea sx={{padding: 4}} onClick={() => navigate({
                        to: "/app/categories"
                    })}>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <CategoryIcon fontSize="large"/>
                            <Typography variant="h4">Kategorií: {homeInfoQuery.data.categoryCount}</Typography>
                        </Box>
                    </CardActionArea>
                </Card>
            </Stack>
        </Box>
    )
}

interface HomeInfoDto {
    userCount: number,
    signCount: number,
    subjectCount: number,
    categoryCount: number,
}
