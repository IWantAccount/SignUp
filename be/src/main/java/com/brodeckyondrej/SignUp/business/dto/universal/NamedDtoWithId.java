package com.brodeckyondrej.SignUp.business.dto.universal;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class NamedDtoWithId extends IdDto {
    @NotBlank
    protected String name;

    public NamedDtoWithId(UUID id, String name) {
        super(id);
        this.name = name;
    }
}
