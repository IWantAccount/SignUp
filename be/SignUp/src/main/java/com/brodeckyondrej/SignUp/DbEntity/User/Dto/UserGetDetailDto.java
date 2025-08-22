package com.brodeckyondrej.SignUp.DbEntity.User.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class UserGetDetailDto extends NamedDtoWithId {
    private final String email;
    private final String classroomName;

    public UserGetDetailDto(UUID id, String name, String email, String classroomName){
        super(id, name);
        this.email = email;
        this.classroomName = classroomName;
    }
}
