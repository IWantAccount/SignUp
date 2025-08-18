package com.brodeckyondrej.SignUp.DbEntity.Category.Dto;

import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.SignGetListDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class CategoryGetDetailDto extends NamedDtoWithId {

    public CategoryGetDetailDto(UUID id, String name){
        super(id, name);
    }
}
