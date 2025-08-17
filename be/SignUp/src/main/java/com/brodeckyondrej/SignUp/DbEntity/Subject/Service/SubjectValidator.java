package com.brodeckyondrej.SignUp.DbEntity.Subject.Service;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.CreateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class SubjectValidator implements Validator<CreateSubjectDto, UpdateSubjectDto> {
    @Override
    public void validateCreateOrThrow(CreateSubjectDto createSubjectDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UpdateSubjectDto updateSubjectDto) {

    }
}
