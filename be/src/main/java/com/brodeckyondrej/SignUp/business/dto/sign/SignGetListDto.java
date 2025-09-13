package com.brodeckyondrej.SignUp.business.dto.sign;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.business.dto.universal.IdDto;
import lombok.Getter;
import org.springframework.core.io.Resource;

import java.util.Set;
import java.util.UUID;

@Getter
public class SignGetListDto extends IdDto {

    private final String videoFileName;
    private final CategoryGetListDto category;
    private final Set<String> translations;

    public SignGetListDto(UUID id, String videoFileName, CategoryGetListDto category, Set<String> translations) {
        super(id);
        this.videoFileName = videoFileName;
        this.category = category;
        this.translations = translations;
    }
}
