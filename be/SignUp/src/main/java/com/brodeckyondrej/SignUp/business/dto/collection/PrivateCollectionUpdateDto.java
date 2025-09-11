package com.brodeckyondrej.SignUp.business.dto.collection;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PrivateCollectionUpdateDto extends NamedDto {

    public PrivateCollectionUpdateDto(@NotNull String name) {
        super(name);
    }
}
