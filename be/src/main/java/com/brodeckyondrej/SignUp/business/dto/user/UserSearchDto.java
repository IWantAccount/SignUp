package com.brodeckyondrej.SignUp.business.dto.user;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class UserSearchDto {
    private final String name;
    private final String email;
    private final UserRole role;
    private final UUID classroomId;
    private final UUID subjectId;
}
