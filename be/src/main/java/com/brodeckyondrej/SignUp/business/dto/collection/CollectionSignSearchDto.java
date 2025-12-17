package com.brodeckyondrej.SignUp.business.dto.collection;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class CollectionSignSearchDto {
    private final String collectionName;

    private final UUID ownerId;

    @NotNull
    private final UUID signId;
}
