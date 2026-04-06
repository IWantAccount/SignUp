package com.brodeckyondrej.SignUp.business.dto.invite;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InviteCreateDto {
    private final UserRole role;
}
