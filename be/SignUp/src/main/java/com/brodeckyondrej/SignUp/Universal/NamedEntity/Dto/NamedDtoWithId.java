package com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto;

import com.brodeckyondrej.SignUp.Universal.Dto.IdDto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
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
