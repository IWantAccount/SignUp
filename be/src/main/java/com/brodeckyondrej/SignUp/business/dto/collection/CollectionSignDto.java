package com.brodeckyondrej.SignUp.business.dto.collection;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class CollectionSignDto {

    @NotNull
    private final UUID collectionId;

    @NotNull
    private final UUID signId;
}
