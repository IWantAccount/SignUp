package com.brodeckyondrej.SignUp.business.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChangePasswordDto {
    private final String newPassword;
}
