package com.brodeckyondrej.SignUp.business.dto.subject;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.UUID;

@Getter
public class SubjectStudentDto {

    @NotNull
    private final UUID studentId;

    @NotNull
    private final UUID subjectId;

    public SubjectStudentDto(UUID studentId, UUID subjectId) {
        this.studentId = studentId;
        this.subjectId = subjectId;
    }

}
