package com.brodeckyondrej.SignUp.business.service.subject;

import com.brodeckyondrej.SignUp.business.dto.subject.CreateSubjectDto;
import com.brodeckyondrej.SignUp.business.dto.subject.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SubjectValidator implements Validator<CreateSubjectDto, UpdateSubjectDto> {
    @Override
    public void validateCreateOrThrow(CreateSubjectDto createSubjectDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UpdateSubjectDto updateSubjectDto) {

    }
}
