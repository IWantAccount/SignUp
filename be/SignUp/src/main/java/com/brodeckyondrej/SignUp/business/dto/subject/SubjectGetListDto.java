package com.brodeckyondrej.SignUp.business.dto.subject;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class SubjectGetListDto extends NamedDtoWithId {
    private final int numberOfStudents;
    private final int numberOfCategories;

    public SubjectGetListDto (UUID id, String name, int numberOfStudents, int numberOfCategories){
        super(id, name);
        this.numberOfStudents = numberOfStudents;
        this.numberOfCategories = numberOfCategories;
    }
}
