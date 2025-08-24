package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PrivateCollectionUpdateDto extends NamedDto {

    public PrivateCollectionUpdateDto(@NotNull String name) {
        super(name);
    }
}
