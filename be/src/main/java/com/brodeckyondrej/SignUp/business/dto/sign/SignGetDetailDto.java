package com.brodeckyondrej.SignUp.business.dto.sign;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.persistence.enumerated.LanguageLevel;
import com.brodeckyondrej.SignUp.persistence.enumerated.Region;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignType;
import com.brodeckyondrej.SignUp.business.dto.component.ComponentIdDto;
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
    
    private final ComponentIdDto handShape;
    private final ComponentIdDto location;
    private final ComponentIdDto movement;
    private final ComponentIdDto palmOrientation;
    private final ComponentIdDto fingerOrientation;
    private final ComponentIdDto contactRegion;
    private final ComponentIdDto handArrangement;

    public SignGetDetailDto(
            UUID id, CategoryGetListDto category, Set<String> translations,
            SubjectGetListDto subject, Region region, LanguageLevel languageLevel,
            SignType signType, String explanation,
            ComponentIdDto handShape, ComponentIdDto location, ComponentIdDto movement,
            ComponentIdDto palmOrientation, ComponentIdDto fingerOrientation,
            ComponentIdDto contactRegion, ComponentIdDto handArrangement) {
        super(id, category, translations);
        this.subject = subject;
        this.region = region;
        this.languageLevel = languageLevel;
        this.signType = signType;
        this.explanation = explanation;
        this.handShape = handShape;
        this.location = location;
        this.movement = movement;
        this.palmOrientation = palmOrientation;
        this.fingerOrientation = fingerOrientation;
        this.contactRegion = contactRegion;
        this.handArrangement = handArrangement;
    }
}
