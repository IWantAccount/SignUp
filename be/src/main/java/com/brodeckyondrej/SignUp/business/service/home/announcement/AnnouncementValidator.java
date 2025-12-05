package com.brodeckyondrej.SignUp.business.service.home.announcement;

import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementCreateDto;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AnnouncementValidator implements Validator<AnnouncementCreateDto, AnnouncementUpdateDto> {
    @Override
    public void validateCreateOrThrow(AnnouncementCreateDto announcementCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, AnnouncementUpdateDto announcementUpdateDto) {

    }
}
