package com.brodeckyondrej.SignUp.business.dto.classroom;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class ClassroomGetListDto extends NamedDtoWithId {

    private final long numberOfStudents;

    public ClassroomGetListDto(UUID id, String name, long numberOfStudents){
        super(id, name);
        this.numberOfStudents = numberOfStudents;
    }
}
