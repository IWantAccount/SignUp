package com.brodeckyondrej.SignUp.business.dto.component;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SignComponentUpdateDto {
    @NotBlank
    private final String textDescription;
}
