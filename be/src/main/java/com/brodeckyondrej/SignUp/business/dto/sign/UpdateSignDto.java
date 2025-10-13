package com.brodeckyondrej.SignUp.business.dto.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.notation.NotationIdDto;
import com.brodeckyondrej.SignUp.persistence.enumerated.LanguageLevel;
import com.brodeckyondrej.SignUp.persistence.enumerated.Region;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class UpdateSignDto {

    @NotNull
    private final UUID categoryId;

    @NotNull
    private final SignType type;

    private final LanguageLevel languageLevel;
    private final Region region;

    @NotEmpty
    private final Set<String> translations;

    private final String explanation;

    private final NotationIdDto notation;
}
