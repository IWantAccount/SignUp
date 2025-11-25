package com.brodeckyondrej.SignUp.business.dto.sign.notation;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class NotationIdDto {

    private final boolean bothHandsUsed;

    private final boolean asymmetricSign;

    private final HandNotationIdDto activeHandNotation;

    private final HandNotationIdDto passiveHandNotation;

    private final UUID articulationLocationId;

    private final UUID movementId;

    private final UUID contactId;

    private final UUID handArrangementId;
}
