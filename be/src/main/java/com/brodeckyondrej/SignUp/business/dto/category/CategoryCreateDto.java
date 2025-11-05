package com.brodeckyondrej.SignUp.business.dto.category;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import lombok.Getter;

import java.util.UUID;

@Getter
public class CategoryCreateDto extends NamedDto {

    private final UUID subjectId;

    public CategoryCreateDto(String name, UUID subjectId){
        super(name);
        this.subjectId = subjectId;
    }
}
