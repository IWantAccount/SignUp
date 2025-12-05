package com.brodeckyondrej.SignUp.business.dto.home.announcement;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnnouncementUpdateDto {
    @NotBlank
    private final String title;
    @NotBlank
    private final String content;
}
