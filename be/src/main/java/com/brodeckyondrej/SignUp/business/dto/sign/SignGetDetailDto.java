package com.brodeckyondrej.SignUp.business.dto.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.notation.NotationDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.persistence.enumerated.LanguageLevel;
import com.brodeckyondrej.SignUp.persistence.enumerated.Region;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignType;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectGetListDto;
import lombok.Getter;

import java.util.Set;
import java.util.UUID;

@Getter
public class SignGetDetailDto extends SignGetListDto {
    private final SubjectGetListDto subject;
    private final Region region;
    private final LanguageLevel languageLevel;
    private final SignType signType;
    private final String explanation;
    
    private final NotationDto notation;
    private final String videoFileName;

    public SignGetDetailDto(
            UUID id, CategoryGetListDto category, Set<String> translations,
            SubjectGetListDto subject, Region region, LanguageLevel languageLevel,
            SignType signType, String explanation,
            NotationDto notation,
            String videoFileName) {
        super(id, videoFileName, category, translations);
        this.subject = subject;
        this.region = region;
        this.languageLevel = languageLevel;
        this.signType = signType;
        this.explanation = explanation;
        this.notation = notation;
        this.videoFileName = videoFileName;
    }
}
