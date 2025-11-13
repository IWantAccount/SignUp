package com.brodeckyondrej.SignUp.business.dto.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class StudentClassroomSearchDto {
    @NotNull
    private final String studentName;
    @NotNull
    private final UUID classroomId;
}
