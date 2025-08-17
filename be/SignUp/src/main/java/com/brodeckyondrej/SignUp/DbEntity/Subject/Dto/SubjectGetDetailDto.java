package com.brodeckyondrej.SignUp.DbEntity.Subject.Dto;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Dto.StudentGetListDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class SubjectGetDetailDto extends NamedDtoWithId {
    private final List<StudentGetListDto> students;
    private final List<CategoryGetListDto> categories;

    public SubjectGetDetailDto(UUID id, String name, List<StudentGetListDto> students, List<CategoryGetListDto> categories) {
        super(id, name);
        this.students = students;
        this.categories = categories;
    }
}
