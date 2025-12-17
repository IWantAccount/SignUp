import type {
    AnnouncementCreateDto,
    AnnouncementGetDetailDto, AnnouncementGetListDto,
    AnnouncementSearchDto
} from "@/api/announcement/announcement-dtos.ts";
import api from "@/api/universal/axios.ts";
import {buildPath} from "@/api/util/build-path.ts";
import type {Page} from "@/api/universal/pagination/spring-boot-page.ts";
//Axios call for announcement
const url = "/announcement";


export const createAnnouncement = async (dto: AnnouncementCreateDto): Promise<AnnouncementGetDetailDto> => {
    const res = await api.post<AnnouncementGetDetailDto>(buildPath([url]), dto);
    return res.data;
}

/**
 * paging call. it is possible to specify page size and offset
 * */
export const getAnnouncementSearch = async (dto: AnnouncementSearchDto, page: number, pageSize?: number): Promise<Page<AnnouncementGetListDto>> => {
    const res = await api.post<Page<AnnouncementGetListDto>>(buildPath([url, "search"], page, pageSize), dto);
    return res.data;
}