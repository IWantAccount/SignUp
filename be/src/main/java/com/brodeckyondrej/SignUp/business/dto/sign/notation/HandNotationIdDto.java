package com.brodeckyondrej.SignUp.business.dto.sign.notation;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class HandNotationIdDto {
    private final UUID handShapeId;
    private final UUID palmOrientationId;
    private final UUID fingerOrientationId;
}
