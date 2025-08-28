package com.brodeckyondrej.SignUp.business.dto.component;

import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ComponentDto {
    @NotBlank
    private final String component;

    @NotNull
    private final SignComponentType type;
}
