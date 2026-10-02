package com.brodeckyondrej.SignUp.business.dto.password;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordRequestDto {
    @NotBlank
    private String email;
}
