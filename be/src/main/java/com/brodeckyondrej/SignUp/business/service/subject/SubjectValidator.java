package com.brodeckyondrej.SignUp.business.service.subject;

import com.brodeckyondrej.SignUp.business.dto.subject.SubjectCreateDto;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SubjectValidator implements Validator<SubjectCreateDto, SubjectUpdateDto> {
    @Override
    public void validateCreateOrThrow(SubjectCreateDto subjectCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, SubjectUpdateDto subjectUpdateDto) {

    }
}
