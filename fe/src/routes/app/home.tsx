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
            <Box
                sx={{
                    width: {xs: "100%", md: "30%"},
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                        md: "1fr",
                    },
                    gap: 2,
                }}
            >
                <Card
                    sx={{
                        width: {xs: "100%", sm: 260},
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: 2,
                        transition: "transform 150ms ease, box-shadow 150ms ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 5,
                        },
                    }}
                >
                    <CardActionArea
                        sx={{
                            p: {xs: 2.5, sm: 3},
                            minHeight: 120,
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => navigate({
                            to: "/app/users"
                        })}
                    >
                        <Box sx={{display: "flex", alignItems: "center", gap: 2, width: "100%"}}>
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",
                                    flexShrink: 0,
                                }}
                            >
                                <GroupIcon fontSize="large"/>
                            </Box>

                            <Box sx={{minWidth: 0}}>
                                <Typography variant="body2" color="text.secondary">
                                    Uživatelů
                                </Typography>
                                <Typography variant="h4" fontWeight={700} lineHeight={1.1}>
                                    {homeInfoQuery.data.userCount}
                                </Typography>
                            </Box>
                        </Box>
                    </CardActionArea>
                </Card>

                <Card
                    sx={{
                        width: {xs: "100%", sm: 260},
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: 2,
                        transition: "transform 150ms ease, box-shadow 150ms ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 5,
                        },
                    }}
                >
                    <CardActionArea
                        sx={{
                            p: {xs: 2.5, sm: 3},
                            minHeight: 120,
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => navigate({
                            to: "/app/signs"
                        })}
                    >
                        <Box sx={{display: "flex", alignItems: "center", gap: 2, width: "100%"}}>
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",
                                    flexShrink: 0,
                                }}
                            >
                                <SignLanguageIcon fontSize="large"/>
                            </Box>

                            <Box sx={{minWidth: 0}}>
                                <Typography variant="body2" color="text.secondary">
                                    Znaků
                                </Typography>
                                <Typography variant="h4" fontWeight={700} lineHeight={1.1}>
                                    {homeInfoQuery.data.signCount}
                                </Typography>
                            </Box>
                        </Box>
                    </CardActionArea>
                </Card>

                <Card
                    sx={{
                        width: {xs: "100%", sm: 260},
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: 2,
                        transition: "transform 150ms ease, box-shadow 150ms ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 5,
                        },
                    }}
                >
                    <CardActionArea
                        sx={{
                            p: {xs: 2.5, sm: 3},
                            minHeight: 120,
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => navigate({
                            to: "/app/subjects"
                        })}
                    >
                        <Box sx={{display: "flex", alignItems: "center", gap: 2, width: "100%"}}>
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",
                                    flexShrink: 0,
                                }}
                            >
                                <SchoolIcon fontSize="large"/>
                            </Box>

                            <Box sx={{minWidth: 0}}>
                                <Typography variant="body2" color="text.secondary">
                                    Předmětů
                                </Typography>
                                <Typography variant="h4" fontWeight={700} lineHeight={1.1}>
                                    {homeInfoQuery.data.subjectCount}
                                </Typography>
                            </Box>
                        </Box>
                    </CardActionArea>
                </Card>

                <Card
                    sx={{
                        width: {xs: "100%", sm: 260},
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: 2,
                        transition: "transform 150ms ease, box-shadow 150ms ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 5,
                        },
                    }}
                >
                    <CardActionArea
                        sx={{
                            p: {xs: 2.5, sm: 3},
                            minHeight: 120,
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => navigate({
                            to: "/app/categories"
                        })}
                    >
                        <Box sx={{display: "flex", alignItems: "center", gap: 2, width: "100%"}}>
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",
                                    flexShrink: 0,
                                }}
                            >
                                <CategoryIcon fontSize="large"/>
                            </Box>

                            <Box sx={{minWidth: 0}}>
                                <Typography variant="body2" color="text.secondary">
                                    Kategorií
                                </Typography>
                                <Typography variant="h4" fontWeight={700} lineHeight={1.1}>
                                    {homeInfoQuery.data.categoryCount}
                                </Typography>
                            </Box>
                        </Box>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
    )
}

interface HomeInfoDto {
    userCount: number,
    signCount: number,
    subjectCount: number,
    categoryCount: number,
}
