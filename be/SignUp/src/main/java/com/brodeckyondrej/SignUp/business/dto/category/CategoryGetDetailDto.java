package com.brodeckyondrej.SignUp.business.dto.category;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class CategoryGetDetailDto extends NamedDtoWithId {

    public CategoryGetDetailDto(UUID id, String name){
        super(id, name);
    }
}
