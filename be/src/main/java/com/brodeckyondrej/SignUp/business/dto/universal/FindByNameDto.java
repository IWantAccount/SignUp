package com.brodeckyondrej.SignUp.business.dto.universal;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FindByNameDto {
    @NotNull
    private final String name;
}
