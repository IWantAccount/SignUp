package com.brodeckyondrej.SignUp.business.dto.component;

import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ComponentTypeDto {
    @NotNull
    private final SignComponentType type;
    public ComponentTypeDto(SignComponentType type) {
        this.type = type;
    }
}
