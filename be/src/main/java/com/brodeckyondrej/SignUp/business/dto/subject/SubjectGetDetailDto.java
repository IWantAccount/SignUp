package com.brodeckyondrej.SignUp.business.dto.subject;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class SubjectGetDetailDto extends NamedDtoWithId {

    public SubjectGetDetailDto(UUID id, String name) {
        super(id, name);
    }
}
