package com.brodeckyondrej.SignUp.business.service.subject;

import com.brodeckyondrej.SignUp.business.service.category.CategoryMapper;
import com.brodeckyondrej.SignUp.business.dto.subject.CreateSubjectDto;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectGetListDto;
import com.brodeckyondrej.SignUp.business.dto.subject.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.business.service.user.UserMapper;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
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
