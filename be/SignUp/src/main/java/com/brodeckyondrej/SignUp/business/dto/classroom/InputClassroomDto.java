package com.brodeckyondrej.SignUp.business.dto.classroom;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import lombok.Getter;

@Getter
public class InputClassroomDto extends NamedDto {
    public InputClassroomDto(String name) {
        super(name);
    }
}
