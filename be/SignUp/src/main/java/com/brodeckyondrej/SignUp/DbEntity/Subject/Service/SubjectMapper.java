package com.brodeckyondrej.SignUp.DbEntity.Subject.Service;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.CreateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import org.springframework.stereotype.Component;

@Component
public class SubjectMapper implements EntityMapper<Subject, CreateSubjectDto, UpdateSubjectDto, SubjectGetDetailDto, SubjectGetListDto> {

    //TODO category mapper
    //TODO student mapper

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
        //TODO az budes mit student a category mappery
        return null;
    }

    @Override
    public SubjectGetListDto toListDto(Subject entity) {
        return new SubjectGetListDto(entity.getId(), entity.getName(), entity.getStudents().size(), entity.getCategories().size());
    }
}
