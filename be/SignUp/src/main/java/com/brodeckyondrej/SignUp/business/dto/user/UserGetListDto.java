package com.brodeckyondrej.SignUp.business.dto.user;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class UserGetListDto extends NamedDtoWithId {
    private final String email;
    private final String classroomName;

    public UserGetListDto(UUID id, String name, String email, String classroomName) {
        super(id, name);
        this.email = email;
        this.classroomName = classroomName;
    }
}
