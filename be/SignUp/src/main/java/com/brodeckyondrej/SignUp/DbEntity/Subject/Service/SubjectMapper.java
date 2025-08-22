package com.brodeckyondrej.SignUp.DbEntity.Subject.Service;

import com.brodeckyondrej.SignUp.DbEntity.Category.Service.CategoryMapper;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.CreateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.DbEntity.User.Service.UserMapper;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectMapper implements EntityMapper<Subject, CreateSubjectDto, UpdateSubjectDto, SubjectGetDetailDto, SubjectGetListDto> {

    private final CategoryMapper categoryMapper;
    private final UserMapper userMapper;

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
        return new SubjectGetDetailDto(entity.getId(), entity.getName());
    }

    @Override
    public SubjectGetListDto toListDto(Subject entity) {
        //TODO replace set.getSize() with db count calls
        return new SubjectGetListDto(entity.getId(), entity.getName(), entity.getStudents().size(), entity.getCategories().size());
    }
}
