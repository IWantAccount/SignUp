package com.brodeckyondrej.SignUp.business.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

/**
 * This dto says if given student is enrolled in given subject
 * */
@Getter
@AllArgsConstructor
public class StudentInSubjectDto {
    private final String studentName;
    private final UUID studentId;
    private final boolean inGivenSubject;
    private final UUID subjectId;
}
