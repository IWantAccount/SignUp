package com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InputClassroomDto extends NamedDto {
    public InputClassroomDto(String name) {
        super(name);
    }
}
