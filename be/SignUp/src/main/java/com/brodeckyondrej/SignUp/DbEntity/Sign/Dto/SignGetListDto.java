package com.brodeckyondrej.SignUp.DbEntity.Sign.Dto;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.Universal.Dto.IdDto;
import lombok.Getter;
import java.util.Set;
import java.util.UUID;

@Getter
public class SignGetListDto extends IdDto {

    // TODO private video
    private final CategoryGetListDto category;
    private final Set<String> translations;

    public SignGetListDto(UUID id, CategoryGetListDto category, Set<String> translations) {
        super(id);
        this.category = category;
        this.translations = translations;
    }
}
