package com.brodeckyondrej.SignUp.business.dto.subject;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class SubjectClassroomDto {

    @NotNull
    private final UUID subjectId;

    @NotNull
    private final UUID classroomId;
}
