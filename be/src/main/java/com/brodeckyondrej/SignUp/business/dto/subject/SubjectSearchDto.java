package com.brodeckyondrej.SignUp.business.dto.subject;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class SubjectSearchDto {
    private final UUID studentId;
    private final String search;
}
