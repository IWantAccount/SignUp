package com.brodeckyondrej.SignUp.business.dto.classroom;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import lombok.Getter;

@Getter
public class CreateClassroomDto extends NamedDto {
    public CreateClassroomDto(String name) {
        super(name);
    }
}
