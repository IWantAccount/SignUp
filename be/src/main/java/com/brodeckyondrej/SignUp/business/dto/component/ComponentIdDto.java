package com.brodeckyondrej.SignUp.business.dto.component;

import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import com.brodeckyondrej.SignUp.business.dto.universal.IdDto;
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
