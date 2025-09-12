package com.brodeckyondrej.SignUp.business.dto.sign;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.business.dto.universal.IdDto;
import lombok.Getter;
import org.springframework.core.io.Resource;

import java.util.Set;
import java.util.UUID;

@Getter
public class SignGetListDto extends IdDto {

    private final Resource video;
    private final CategoryGetListDto category;
    private final Set<String> translations;

    public SignGetListDto(UUID id, Resource video, CategoryGetListDto category, Set<String> translations) {
        super(id);
        this.video = video;
        this.category = category;
        this.translations = translations;
    }
}
