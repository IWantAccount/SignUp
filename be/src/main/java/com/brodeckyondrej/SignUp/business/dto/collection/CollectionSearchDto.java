package com.brodeckyondrej.SignUp.business.dto.collection;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class CollectionSearchDto {
    private final UUID ownerId;
    private final String search;
}
