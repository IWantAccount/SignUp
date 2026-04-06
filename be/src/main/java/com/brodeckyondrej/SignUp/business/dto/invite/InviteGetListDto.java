package com.brodeckyondrej.SignUp.business.dto.invite;

import com.brodeckyondrej.SignUp.business.dto.user.UserGetListDto;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class InviteGetListDto {
    private final UUID id;
    private final UserRole role;
    private final Instant usedAt;
    private final UserGetListDto createdUser;
}
