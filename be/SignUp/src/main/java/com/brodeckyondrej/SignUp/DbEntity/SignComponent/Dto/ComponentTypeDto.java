package com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto;

import com.brodeckyondrej.SignUp.DbEntity.SignComponent.SignComponentType;
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
