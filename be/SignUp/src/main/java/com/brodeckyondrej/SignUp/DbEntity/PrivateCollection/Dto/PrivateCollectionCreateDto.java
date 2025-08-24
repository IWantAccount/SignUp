package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.UUID;

@Getter
public class PrivateCollectionCreateDto extends NamedDto {

    @NotNull
    private final UUID ownerId;

    public PrivateCollectionCreateDto(@NotNull UUID ownerId, @NotNull String name) {
        super(name);
        this.ownerId = ownerId;
    }
}
