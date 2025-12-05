package com.brodeckyondrej.SignUp.business.dto.home.announcement;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AnnouncementSearchDto {
    @NotNull
    Long lastDays;
}
