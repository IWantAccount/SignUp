package com.brodeckyondrej.SignUp.business.dto.sign.notation;

import com.brodeckyondrej.SignUp.business.dto.component.SignComponentGetListDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HandNotationDto {
    private final SignComponentGetListDto handShape;
    private final SignComponentGetListDto palmOrientation;
    private final SignComponentGetListDto fingerOrientation;
}
