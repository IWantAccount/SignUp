package com.brodeckyondrej.SignUp.business.dto.invite;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InviteCreateDto {
    @NotNull
    private final UserRole role;
    @NotBlank
    private final String email;
}
