package com.brodeckyondrej.SignUp.business.dto.password;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class PasswordRestoreDto {

    @NotBlank
    private String password;

    @NotNull
    private UUID reqId;
}
