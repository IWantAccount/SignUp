package com.brodeckyondrej.SignUp.business.dto.user;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRoleNameDto {
    @NotNull
    private final UserRole role;
    @NotNull
    private final String name;
}
