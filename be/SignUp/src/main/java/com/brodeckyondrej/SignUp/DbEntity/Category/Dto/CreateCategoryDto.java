package com.brodeckyondrej.SignUp.DbEntity.Category.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDto;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
public class CreateCategoryDto extends NamedDto {

    private final UUID subjectId;

    public CreateCategoryDto(String name, UUID subjectId){
        super(name);
        this.subjectId = subjectId;
    }
}
