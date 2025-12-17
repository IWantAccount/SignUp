import {infiniteQueryOptions, type QueryClient, type UseMutationOptions} from "@tanstack/react-query";
import type {
    AnnouncementCreateDto,
    AnnouncementGetDetailDto,
    AnnouncementSearchDto
} from "@/api/announcement/announcement-dtos.ts";
import type {AxiosError} from "axios";
import {createAnnouncement, getAnnouncementSearch} from "@/api/announcement/announcement-api.ts";
import {springInfiniteBase} from "@/api/universal/pagination/spring-infinite-base.ts";
import type {useNavigate} from "@tanstack/react-router";

export const announcementQueryKey = "announcement";

export function createCreateAnnouncementOptions(queryClient: QueryClient, navigate: ReturnType<typeof useNavigate>): UseMutationOptions<AnnouncementGetDetailDto, AxiosError, AnnouncementCreateDto> {
    return {
        mutationKey: [announcementQueryKey],
        mutationFn: (dto: AnnouncementCreateDto) => createAnnouncement(dto),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({queryKey: [announcementQueryKey]}),
                navigate({
                    to: "/app/home"
                })
            ])
        }
    }
}

/**
 * You can specify pageSize
 * @returns options for infiniteQuery.
 * */
export function createAnnouncementSearchOptions(dto: AnnouncementSearchDto, pageSize?: number) {
    return infiniteQueryOptions({
        queryKey: [announcementQueryKey, "infinite", dto],
        queryFn: ({pageParam}) => getAnnouncementSearch(dto, pageParam, pageSize),
        ...springInfiniteBase
    })
}