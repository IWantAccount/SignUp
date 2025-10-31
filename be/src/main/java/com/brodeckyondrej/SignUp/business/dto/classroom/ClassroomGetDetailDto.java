package com.brodeckyondrej.SignUp.business.dto.classroom;

import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class ClassroomGetDetailDto extends NamedDtoWithId {

    public ClassroomGetDetailDto(UUID id, String name){
        super(id, name);
    }
}
