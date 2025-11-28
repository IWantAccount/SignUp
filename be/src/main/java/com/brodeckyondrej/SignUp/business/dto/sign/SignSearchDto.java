package com.brodeckyondrej.SignUp.business.dto.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.notation.NotationIdDto;
import com.brodeckyondrej.SignUp.persistence.enumerated.LanguageLevel;
import com.brodeckyondrej.SignUp.persistence.enumerated.Region;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class SignSearchDto {
    private final String translationSearch;
    private final UUID categoryId;
    private final UUID collectionId;
    private final SignType type;
    private final LanguageLevel languageLevel;
    private final Region region;
    private final NotationIdDto notation;
}
