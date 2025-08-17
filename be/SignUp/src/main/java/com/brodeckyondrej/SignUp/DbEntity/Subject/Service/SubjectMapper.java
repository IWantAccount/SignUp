package com.brodeckyondrej.SignUp.DbEntity.Subject.Service;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Service.CategoryMapper;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.CreateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Dto.StudentGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Service.StudentMapper;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectMapper implements EntityMapper<Subject, CreateSubjectDto, UpdateSubjectDto, SubjectGetDetailDto, SubjectGetListDto> {

    private final CategoryMapper categoryMapper;
    private final StudentMapper studentMapper;

    @Override
    public Subject fromCreateDto(CreateSubjectDto createSubjectDto) {
        return new Subject(createSubjectDto.getName());
    }

    @Override
    public void updateFromDto(Subject entity, UpdateSubjectDto updateSubjectDto) {
        entity.setName(updateSubjectDto.getName());
    }

    @Override
    public SubjectGetDetailDto toDetailDto(Subject entity) {
        List<StudentGetListDto> students = entity.getStudents().stream().map(studentMapper::toListDto).toList();
        List<CategoryGetListDto> categories = entity.getCategories().stream().map(categoryMapper::toListDto).toList();
        return new SubjectGetDetailDto(entity.getId(), entity.getName(), students, categories);
    }

    @Override
    public SubjectGetListDto toListDto(Subject entity) {
        return new SubjectGetListDto(entity.getId(), entity.getName(), entity.getStudents().size(), entity.getCategories().size());
    }
}
