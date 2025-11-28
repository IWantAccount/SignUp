package com.brodeckyondrej.SignUp.business.dto.component;

import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignComponentSearchDto {
    private final SignComponentType type;
    private final String description;
}
