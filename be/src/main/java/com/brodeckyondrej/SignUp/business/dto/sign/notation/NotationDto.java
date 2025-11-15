package com.brodeckyondrej.SignUp.business.dto.sign.notation;

import com.brodeckyondrej.SignUp.business.dto.component.SignComponentGetListDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotationDto {

    private final boolean bothHandsUsed;
    private final boolean asymmetricSign;

    private final HandNotationDto activeHandNotation;
    private final HandNotationDto passiveHandNotation;

    private final SignComponentGetListDto articulationLocation;
    private final SignComponentGetListDto movement;
    private final SignComponentGetListDto contact;
    private final SignComponentGetListDto handArrangement;

}
