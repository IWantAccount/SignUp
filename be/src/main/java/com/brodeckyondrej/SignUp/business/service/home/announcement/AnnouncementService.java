package com.brodeckyondrej.SignUp.business.service.home.announcement;

import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementCreateDto;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementGetListDto;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.AnnouncementUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.business.specification.AnnouncementSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Announcement;
import com.brodeckyondrej.SignUp.persistence.repository.AnnouncementRepository;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@Transactional
public class AnnouncementService extends EntityService<Announcement, AnnouncementCreateDto, AnnouncementUpdateDto, AnnouncementGetDetailDto, AnnouncementGetListDto> {
    private final AnnouncementRepository repository;
    private final AnnouncementMapper mapper;

    public AnnouncementService(AnnouncementRepository repository, AnnouncementValidator validator, AnnouncementMapper mapper) {
        super(repository, validator, mapper);
        this.repository = repository;
        this.mapper = mapper;
    }

    public Page<AnnouncementGetListDto> getLastDays(Long days, Pageable pageable) {
        SpecificationBuilder<Announcement> specBuilder = new SpecificationBuilder<>();
        if(days != null) {
            Instant start = Instant.now().minusSeconds(86400 * days);
                specBuilder
                        .addSpec(AnnouncementSpecification.isNewerThan(start));
        }



        return repository.findAll(specBuilder.build(), pageable).map(mapper::toListDto);
    }
}
