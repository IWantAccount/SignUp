package com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public abstract class NamedDto {
    @NotBlank
    protected String name;
}
