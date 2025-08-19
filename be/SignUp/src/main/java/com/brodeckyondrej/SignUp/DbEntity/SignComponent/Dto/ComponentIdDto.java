package com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto;

import com.brodeckyondrej.SignUp.DbEntity.SignComponent.SignComponentType;
import com.brodeckyondrej.SignUp.Universal.Dto.IdDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.UUID;

@Getter
public class ComponentIdDto extends IdDto {

    @NotBlank
    private final String component;

    @NotNull
    private final SignComponentType type;

    public ComponentIdDto(UUID id, String component, SignComponentType type) {
        super(id);
        this.component = component;
        this.type = type;
    }
}
