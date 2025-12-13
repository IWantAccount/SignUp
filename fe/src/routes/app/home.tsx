import {Box, Card, CardActionArea, ListItem, Stack, Typography} from '@mui/material'
import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
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
import {createAnnouncementSearchOptions} from "@/api/announcement/announcement-query-options.ts";
import type {AnnouncementGetListDto} from "@/api/announcement/announcement-dtos.ts";


export const Route = createFileRoute('/app/home')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const announcementQuery = useInfiniteQuery(createAnnouncementSearchOptions({lastDays: 10}));
    const homeInfoQuery = useQuery({
        queryKey: [userQueryKey, signQueryKey, subjectQueryKey, categoryQueryKey],
        queryFn: async () => {
            const res = await api.get<HomeInfoDto>(buildPath(["home-info"]));
            return res.data;
        }
    })
    if(homeInfoQuery.isPending || announcementQuery.isPending) return <BackdropLoading/>
    if(homeInfoQuery.isError || announcementQuery.isError) return <></>

    const announcements: AnnouncementGetListDto[] = announcementQuery.data?.pages.flatMap(page => page.content) ?? [];

    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex", flexWrap: "wrap", width: "80%",
        justifyContent: "space-between", gap: 4, margin: "0 auto"}}>
            <Stack spacing={2} width="60%">
                <Typography variant="h4">Aktuality</Typography>
                <Box sx={{width:"100%", display: "flex", flexDirection: "column", gap: 1, maxHeight: 600, overflowY: "auto", paddingRight: 3}}>
                    {
                        announcements.length == 0 ? (
                            <Typography variant="h5">Žádné aktuality</Typography>
                        ) :
                            (
                                announcements.map(a => (
                                    <ListItem sx={{
                                        display: "block",
                                        border: "1px solid",
                                        borderRadius: 3,
                                        borderColor: "divider",
                                    }}>
                                        <Typography variant="h4" flexWrap="wrap" color="primary">{a.title}</Typography>
                                        <Typography variant="body1" flexWrap="wrap">{a.content}</Typography>
                                    </ListItem>
                                ))
                            )
                    }
                </Box>
            </Stack>
            <Stack spacing={2} width="30%">
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
