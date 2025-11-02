package com.brodeckyondrej.SignUp.business.dto.component;

import com.brodeckyondrej.SignUp.business.dto.universal.IdDto;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.UUID;

@Getter
public class SignComponentGetDetailDto extends IdDto {

    @NotBlank
    private final String textDescription;

    @NotNull
    private final SignComponentType type;

    public SignComponentGetDetailDto(UUID id, String textDescription, SignComponentType type) {
        super(id);
        this.textDescription = textDescription;
        this.type = type;
    }
}
