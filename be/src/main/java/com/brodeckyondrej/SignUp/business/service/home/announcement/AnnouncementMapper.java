package com.brodeckyondrej.SignUp.business.service.home.announcement;

import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementCreateDto;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementGetListDto;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import com.brodeckyondrej.SignUp.persistence.entity.Announcement;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AnnouncementMapper implements EntityMapper<Announcement, AnnouncementCreateDto, AnnouncementUpdateDto,
        AnnouncementGetDetailDto, AnnouncementGetListDto> {
    @Override
    public Announcement fromCreateDto(AnnouncementCreateDto announcementCreateDto) {
        return new Announcement(Instant.now(), announcementCreateDto.getTitle(), announcementCreateDto.getContent());
    }

    @Override
    public void updateFromDto(Announcement entity, AnnouncementUpdateDto announcementUpdateDto) {
        entity.setTitle(announcementUpdateDto.getTitle());
        entity.setContent(announcementUpdateDto.getContent());
    }

    @Override
    public AnnouncementGetDetailDto toDetailDto(Announcement entity) {
        return new AnnouncementGetDetailDto(entity.getTitle(), entity.getContent(), entity.getCreatedAt());
    }

    @Override
    public AnnouncementGetListDto toListDto(Announcement entity) {
        return new AnnouncementGetListDto(entity.getTitle(), entity.getContent(), entity.getCreatedAt());
    }
}
