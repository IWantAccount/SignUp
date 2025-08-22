package com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto;

import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class GetClassroomDetailDto extends NamedDtoWithId {
    private List<User> students;

    public GetClassroomDetailDto (UUID id, String name){
        super(id, name);
    }
}
