package com.brodeckyondrej.SignUp.business.dto.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

/**
 * Dto used for searching students in given subject
 * */
@Getter
@AllArgsConstructor
public class StudentSubjectSearchDto {
    @NotNull
    private final String studentName;
    @NotNull
    private final UUID subjectId;
}
