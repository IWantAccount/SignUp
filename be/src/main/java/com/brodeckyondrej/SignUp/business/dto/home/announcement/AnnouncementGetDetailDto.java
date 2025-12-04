package com.brodeckyondrej.SignUp.business.dto.home.announcement;

import com.brodeckyondrej.SignUp.business.dto.universal.IdDto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class AnnouncementGetDetailDto extends IdDto {
    private final String title;
    private final String content;
    private final Instant createdAt;
}
