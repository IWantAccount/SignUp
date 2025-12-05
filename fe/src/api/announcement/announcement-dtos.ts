interface BaseDto {
    title: string;
    content: string;
}
export interface AnnouncementCreateDto extends BaseDto{

}

export interface AnnouncementUpdateDto extends BaseDto{

}

export interface AnnouncementGetListDto extends BaseDto{

}

export interface AnnouncementGetDetailDto extends BaseDto{

}

export interface AnnouncementSearchDto {
    lastDays: number;
}