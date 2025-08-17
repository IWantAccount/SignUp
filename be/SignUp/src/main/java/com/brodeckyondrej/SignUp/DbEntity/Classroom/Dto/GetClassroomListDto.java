package com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class GetClassroomListDto extends NamedDtoWithId {

    private int numberOfStudents;

    public GetClassroomListDto (UUID id, String name, int numberOfStudents){
        super(id, name);
        this.numberOfStudents = numberOfStudents;
    }
}
