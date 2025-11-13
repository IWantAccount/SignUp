package com.brodeckyondrej.SignUp.business.dto.subject;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class SubjectClassroomDto {
    private final UUID subjectId;
    private final UUID classroomId;
}
