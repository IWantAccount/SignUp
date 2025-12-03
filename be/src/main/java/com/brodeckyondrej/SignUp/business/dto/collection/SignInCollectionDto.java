package com.brodeckyondrej.SignUp.business.dto.collection;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class SignInCollectionDto {
    private final UUID signId;
    private final String collectionName;
    private final UUID collectionId;
    private final boolean signPresentInCollection;
}
