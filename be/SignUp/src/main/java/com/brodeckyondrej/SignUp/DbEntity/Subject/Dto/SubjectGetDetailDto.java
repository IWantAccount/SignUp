package com.brodeckyondrej.SignUp.DbEntity.Subject.Dto;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Dto.StudentGetListDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class SubjectGetDetailDto extends NamedDtoWithId {

    public SubjectGetDetailDto(UUID id, String name) {
        super(id, name);
    }
}
