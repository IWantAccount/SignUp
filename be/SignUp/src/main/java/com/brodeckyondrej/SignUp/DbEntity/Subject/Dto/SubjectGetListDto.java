package com.brodeckyondrej.SignUp.DbEntity.Subject.Dto;

import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
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
