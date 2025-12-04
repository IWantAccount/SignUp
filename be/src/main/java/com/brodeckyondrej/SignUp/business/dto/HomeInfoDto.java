package com.brodeckyondrej.SignUp.business.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HomeInfoDto {
    private final long userCount;
    private final long signCount;
    private final long subjectCount;
    private final long categoryCount;
}
