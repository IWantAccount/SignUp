package com.brodeckyondrej.SignUp.DbEntity.Subject.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class SubjectGetDetailDto extends NamedDtoWithId {

    public SubjectGetDetailDto(UUID id, String name) {
        super(id, name);
    }
}
