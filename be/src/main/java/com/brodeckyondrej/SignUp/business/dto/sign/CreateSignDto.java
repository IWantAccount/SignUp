package com.brodeckyondrej.SignUp.business.dto.sign;

import com.brodeckyondrej.SignUp.persistence.enumerated.LanguageLevel;
import com.brodeckyondrej.SignUp.persistence.enumerated.Region;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class CreateSignDto {

    @NotNull
    private final UUID categoryId;

    @NotNull
    private final SignType type;

    private final LanguageLevel languageLevel;
    private final Region region;

    @NotEmpty
    private final Set<String> translations;

    private final String explanation;

    private final MultipartFile video;

    private final UUID handShapeId;
    private final UUID signLocationId;
    private final UUID movementId;
    private final UUID palmOrientationId;
    private final UUID fingerOrientationId;
    private final UUID contactRegionId;
    private final UUID handArrangementId;

}
