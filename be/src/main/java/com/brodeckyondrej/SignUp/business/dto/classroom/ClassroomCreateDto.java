package com.brodeckyondrej.SignUp.business.dto.classroom;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import lombok.Getter;

@Getter
public class ClassroomCreateDto extends NamedDto {
    public ClassroomCreateDto(String name) {
        super(name);
    }
}
