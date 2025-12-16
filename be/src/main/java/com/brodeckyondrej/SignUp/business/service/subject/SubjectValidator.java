package com.brodeckyondrej.SignUp.business.service.subject;

import com.brodeckyondrej.SignUp.business.dto.subject.SubjectCreateDto;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityValidator;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import org.springframework.stereotype.Service;


@Service
public class SubjectValidator extends NamedEntityValidator<Subject, SubjectCreateDto, SubjectUpdateDto > {

}
