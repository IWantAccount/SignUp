package com.brodeckyondrej.SignUp.business.dto.category;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import lombok.Getter;

import java.util.UUID;

@Getter
public class CreateCategoryDto extends NamedDto {

    private final UUID subjectId;

    public CreateCategoryDto(String name, UUID subjectId){
        super(name);
        this.subjectId = subjectId;
    }
}
