package com.brodeckyondrej.SignUp.business.dto.subject;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class SubjectGetListDto extends NamedDtoWithId {
    private final long numberOfStudents;
    private final long numberOfCategories;

    public SubjectGetListDto (UUID id, String name, long numberOfStudents, long numberOfCategories){
        super(id, name);
        this.numberOfStudents = numberOfStudents;
        this.numberOfCategories = numberOfCategories;
    }
}
