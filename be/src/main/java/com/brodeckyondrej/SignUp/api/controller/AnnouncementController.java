package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import com.brodeckyondrej.SignUp.business.dto.home.announcement.*;
import com.brodeckyondrej.SignUp.business.service.home.announcement.AnnouncementService;
import com.brodeckyondrej.SignUp.persistence.entity.Announcement;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/announcement")
@RestController
public class AnnouncementController extends EntityController<Announcement, AnnouncementCreateDto, AnnouncementUpdateDto, AnnouncementGetDetailDto, AnnouncementGetListDto> {
    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService service){
        super(service);
        this.announcementService = service;
    }

    @PostMapping("/search")
    public ResponseEntity<Page<AnnouncementGetListDto>> getLastDays(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
            @Valid @RequestBody AnnouncementSearchDto dto, Pageable pageable) {
        return ResponseEntity.ok(announcementService.getLastDays(dto.getLastDays(), pageable));
    }
}
