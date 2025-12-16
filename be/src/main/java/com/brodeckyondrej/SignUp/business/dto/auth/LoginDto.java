package com.brodeckyondrej.SignUp.business.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginDto {
    @NotBlank
    private final String name;

    @NotBlank
    private final String password;
}
