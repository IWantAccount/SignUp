package com.brodeckyondrej.SignUp.business.dto.sign.notation;

import com.brodeckyondrej.SignUp.business.dto.component.ComponentIdDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotationDto {

    private final boolean bothHandUsed;
    private final boolean asymmetricSign;

    private final HandNotationDto activeHandNotation;
    private final HandNotationDto passiveHandNotation;

    private final ComponentIdDto articulationLocation;
    private final ComponentIdDto movement;
    private final ComponentIdDto contact;
    private final ComponentIdDto handArrangement;

}
