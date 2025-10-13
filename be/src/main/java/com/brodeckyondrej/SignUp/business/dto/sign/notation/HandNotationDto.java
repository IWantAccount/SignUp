package com.brodeckyondrej.SignUp.business.dto.sign.notation;

import com.brodeckyondrej.SignUp.business.dto.component.ComponentIdDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HandNotationDto {
    private final ComponentIdDto handShape;
    private final ComponentIdDto palmOrientation;
    private final ComponentIdDto fingerOrientation;
}
